import React from 'react';

import {
	Navigate,
	Redirect,
	Route,
	type RouteProps
} from '@resourge/react-router';

import { usePermissions } from 'src/shared/auth/permissions/usePermissions';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import Routes from 'src/shared/routes/Routes';

type Props = RouteProps & {
	can?: string[]
	redirect?: string
};

const AuthorizedRoute: React.FC<Props> = ({
	can, path, redirect, ...props
}: Props) => {
	const permissions = usePermissions();
	const { user } = useAuthentication();

	const _redirect = redirect ?? Routes.NOT_FOUND.get();

	if (
		user.isAuthenticated
		&& (!can || (Array.isArray(can) && can.some((c) => permissions.includes(c))) 
			|| (typeof can === 'string' && permissions.includes(can)))
	) {
		return (
			<Route
				path={path}
				{...props}
			/>
		);
	}

	if (path && Array.isArray(path)) {
		return (
			<>
				{
					path.map((p, index: number) => (
						<Redirect
							key={`redirect_${index}`}
							from={p}
							to={_redirect}
						/>
					))
				}
			</>
		);
	}

	return (
		<Navigate to={_redirect} />
	);
};

export default AuthorizedRoute;
