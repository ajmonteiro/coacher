import HttpBaseService from 'src/shared/services/HttpBaseService';

class UsersPageApi {
	public async all(): Promise<any> {
		return await HttpBaseService.get(`/User`);
	}
}

export default new UsersPageApi();
