import { User } from '../auth/User';
import { envBaseUrl } from '../utils/Environment';

import HttpBaseService from './HttpBaseService';

class AuthenticationService {
	public async login(username: string, password: string): Promise<any> {
		const result = await HttpBaseService.post(
			`${envBaseUrl}/Auth/login`,
			{
				username,
				password
			}
		);

		const { accessToken, refreshToken } = result.data;  

		return {
			token: accessToken,
			refreshToken
		};
	}

	public async getAuthentication(token: string | null | undefined) {
		try {
			if ( token ) {
				const { data: user } = await HttpBaseService.get(
					`${envBaseUrl}/User/me`,
					undefined,
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);

				return {
					user: new User(user),
					token
				};
			}

			return {
				token: null
			};
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		catch (error) {
			return {
				user: new User(),
				token: null
			};
		}
	}

	public async refreshToken(token?: string | null, refreshToken?: string | null) {
		try {
			if ( token && refreshToken ) {
				const { response } = await HttpBaseService.get(
					`${envBaseUrl}/refresh_token`,
					undefined,
					{
						headers: {
							Refresh_token: `${refreshToken}`,
							Authorization: `Bearer ${token}`
						}
					}
				);

				const newToken = response.headers.get('access_token');
				const newRefreshToken = response.headers.get('refresh_token');

				if ( newToken === 'Invalid or expired refresh token' || newRefreshToken === 'Invalid or expired refresh token' ) {
					return {
						token: null
					};
				}

				return {
					token: newToken,
					refreshToken: newRefreshToken
				};
			}
			return {
				token: null
			};
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		catch ( error ) {
			return {
				token: null
			};
		}
	}

	public async logout(token?: string | null) {
		if ( token ) {
			const { data } = await HttpBaseService.post(
				`${envBaseUrl}/Auth/logout`,
				{
					refreshToken: token
				}
			);
			if ( data && data.response.success ) {
				return;
			}

			return await Promise.reject(new Error('Logout unsuccessfully'));
		}
	}
}
export default new AuthenticationService();
