import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type ExerciseType } from './interface/ExerciseModel';

class ExercisePageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/Exercise${pagination.perPage ? `
			?perPage=${pagination.perPage}
			&page=${pagination.page}` : ''}
		`);
	}

	public async create(data: ExerciseType) {
		return await HttpBaseService.post('/Exercise', data);
	}

	public async delete(id: string) {
		return await HttpBaseService.delete(`/Exercise/${id}`);
	}
}

export default new ExercisePageApi();
