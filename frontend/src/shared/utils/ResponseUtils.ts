/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { HttpResponseError, type HttpResponse } from '@resourge/http-service';
import { type HttpResponseConfig } from '@resourge/http-service/dist/utils/HttpResponse';
import { StatusCodes } from 'http-status-codes';

export function httpServiceConfig(config: HttpResponseConfig) {
	return config;
}

export function httpServiceErrorResponseToast(error: HttpResponseError<unknown> | unknown) {
	return Promise.reject(error);
}

export async function httpServiceResponse(response: HttpResponse<any>) {
	const revoResponse = response;
	if ( revoResponse && revoResponse.data.error ) {
		const errorMessage = revoResponse.data.error.error_message['en-US'];
		return await Promise.reject(
			new HttpResponseError(
				typeof errorMessage === 'object' ? errorMessage.error.error_message['en-US'] : errorMessage, 
				revoResponse.request, 
				revoResponse.data, 
				revoResponse.config, 
				revoResponse.status ?? StatusCodes.BAD_REQUEST
			)
		);
	}

	return response;
}
