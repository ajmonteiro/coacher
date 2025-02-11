export class RedirectError extends Error {
	public redirectUrl: string;
	
	constructor(redirectUrl: string, error?: string | undefined) {
		super(error);

		this.redirectUrl = redirectUrl;
		
		this.name = 'RedirectError';

		Error.captureStackTrace(this, RedirectError);
	}
}
