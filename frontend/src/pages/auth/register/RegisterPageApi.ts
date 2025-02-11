import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type RegisterModel } from './interfaces/RegisterModel';

class RegisterPageApi {
	public async register(data: RegisterModel) {
		return await HttpBaseService.post('/Auth/register', data.toModel());
	}
}

export default new RegisterPageApi();
