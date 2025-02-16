/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { type ReactNode } from 'react';

import { AuthenticationSystem, setupAuthentication } from '@resourge/react-authentication';
import { LoadingSuspense, useFetch } from '@resourge/react-fetch';
import { Navigate, useNavigate, useNormalizeUrl } from '@resourge/react-router';

import { RedirectError } from './shared/errors/RedirectError';
import Routes from './shared/routes/Routes';
import AuthenticationService from './shared/services/AuthenticationService';
import HttpBaseService from './shared/services/HttpBaseService';
import { useTranslation } from './shared/translations/Translations';

type Props = {
	children: ReactNode
};

const authentication = setupAuthentication({
	getProfile: (token) => AuthenticationService.getAuthentication(token),
	refreshToken: (token, refreshToken) => AuthenticationService.refreshToken(token, refreshToken),
	storage: window.localStorage
});

const Authentication: React.FC<Props> = ({ children }: Props) => {
	const navigate = useNavigate();
	const normalizeUrl = useNormalizeUrl();
	const { T } = useTranslation();

	const { fetch: onLogout } = useFetch(async (token: string | null) => {
		try {
			await AuthenticationService.logout(token);
		}
		catch {}
	});

	return (
		<AuthenticationSystem 
			authentication={authentication}
			getToken={(getToken) => {
				HttpBaseService.setToken(async (config: any) => {
					if (!config.headers.Authorization) {
						const token = await getToken(false);
						if (token) {
							config.headers.Authorization = `Bearer ${token}`;
						}
					}
					
					return config;
				});
			}}
			loadingComponent={<LoadingSuspense />}
			onLogin={async (username, password) => {
				const result = await AuthenticationService.login(username, password);
						
				return result;
			}}
			onLogout={onLogout}
		>
			{ children }
		</AuthenticationSystem>
	);
};

export default Authentication;
