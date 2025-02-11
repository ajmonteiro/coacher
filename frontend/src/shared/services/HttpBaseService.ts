/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { BaseHttpService, HttpResponseError } from '@resourge/http-service';
import { SessionService } from '@resourge/react-authentication';
import { StatusCodes } from 'http-status-codes';

import { envBaseUrl } from '../utils/Environment';
import { httpServiceConfig, httpServiceResponse, httpServiceErrorResponseToast } from '../utils/ResponseUtils';

class NewHttpService extends BaseHttpService {
}

const HttpBaseService = new NewHttpService({
	baseUrl: envBaseUrl 
});

HttpBaseService.interceptors.request.use(httpServiceConfig);

HttpBaseService.interceptors.response.use(
	httpServiceResponse,
	async (error: HttpResponseError<unknown> | unknown) => {
		if ( error && error instanceof HttpResponseError ) {
			if ( error.data instanceof DOMException && error.data.name === 'AbortError' ) {
				return await Promise.reject(error);
			}
			if (
				error.status === StatusCodes.UNAUTHORIZED
				&& (
					(
						typeof error.data.error === 'object' 
						&& error.data.error.error_message
						&& (
							error.data.error.error_message['en-US'] === 'Access token has expired'
							|| error.data.error.error_message['en-US'] === 'ERROR: OAUTH2-PROVIDER:TOKEN_UNAUTHORIZED'
						)
					)
					|| error.data.error === 'Token has expired.'
				)
			) {
				const hasNewToken: boolean = await SessionService.refreshToken();

				if ( hasNewToken ) {
					if ( error.config.headers ) {
						delete error.config.headers.Authorization;
					}
					return await HttpBaseService.request(error.config);
				}
				await SessionService.logout();
				error.data = new DOMException('', 'AbortError');
				return await Promise.reject(error);
			}
		}

		return await httpServiceErrorResponseToast(error);
	}
);

export default HttpBaseService;
