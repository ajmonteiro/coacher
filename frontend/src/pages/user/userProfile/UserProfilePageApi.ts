import HttpBaseService from 'src/shared/services/HttpBaseService';

class UserProfilePageApi {
	public async get(id: string): Promise<any> {
		return await HttpBaseService.get(`User/${id}`);
	}
}

export default new UserProfilePageApi();
