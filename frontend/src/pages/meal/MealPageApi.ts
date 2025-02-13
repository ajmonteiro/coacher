import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type MealType } from './interfaces/MealModel';

class MealPageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/Meal${pagination.perPage ? `
			?perPage=${pagination.perPage}
			&page=${pagination.page}` : ''}
		`);
	}

	public async create(data: MealType) {
		return await HttpBaseService.post('/Meal', data);
	}

	public async delete(id: string) {
		return await HttpBaseService.delete(`/Meal/${id}`);
	}
}

export default new MealPageApi();
