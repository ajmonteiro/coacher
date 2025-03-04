import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type ClientModel } from './interfaces/ClientModel';

class ClientsPageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/User
			${pagination.perPage ? `
				?perPage=${pagination.perPage}
				&page=${pagination.page}` : ''}
		`);
	}

	public async create(data: ClientModel): Promise<any> {
		return await HttpBaseService.post('/Auth/register', data.toModel());
	}

	public async delete(id: string): Promise<any> {
		return await HttpBaseService.delete(`/User/${id}`);
	}

	public async roles(): Promise<any> {
		return await HttpBaseService.get('/Role');
	}
}

export default new ClientsPageApi();
