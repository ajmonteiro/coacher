import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type FoodType } from './interfaces/FoodModel';

class FoodPageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/Food${pagination.perPage ? `
			?perPage=${pagination.perPage}
			&page=${pagination.page}` : ''}
		`);
	}

	public async create(data: FoodType) {
		return await HttpBaseService.post('/Food', data);
	}

	public async delete(id: string) {
		return await HttpBaseService.delete(`/Food/${id}`);
	}
}

export default new FoodPageApi();
