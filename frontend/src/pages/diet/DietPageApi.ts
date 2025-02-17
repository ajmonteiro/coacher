import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type DietModel } from './interfaces/DietModel';

class DietPageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/Diet${pagination.perPage ? `
			?perPage=${pagination.perPage}
			&page=${pagination.page}` : ''}
		`);
	}

	public async get(id: string) {
		return await HttpBaseService.get(`/Diet/${id}`);
	}
	
	public async create(data: DietModel) {
		return await HttpBaseService.post('/Diet', data.toModel());
	}

	public async update(id: string, data: DietModel) {
		return await HttpBaseService.put(`/Diet/${id}`, {
			id,
			...data.toModel()
		});
	}

	public async delete(id: string) {
		return await HttpBaseService.delete(`/Diet/${id}`);
	}

	public async foodOptions() {
		return await HttpBaseService.get('/Food/options');
	}

	public async userOptions() {
		return await HttpBaseService.get('/User/options');
	}
}

export default new DietPageApi();
