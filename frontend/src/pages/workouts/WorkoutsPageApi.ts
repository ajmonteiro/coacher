import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type WorkoutModel } from './interfaces/WorkoutModel';

class WorkoutsPageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/Workout
			${pagination.perPage ? `
				?perPage=${pagination.perPage}
				&page=${pagination.page}` : ''}
		`);
	}

	public async create(data: WorkoutModel): Promise<any> {
		return await HttpBaseService.post('/Workout', data.toModel());
	}
	
	public async delete(id: string): Promise<any> {
		return await HttpBaseService.delete(`/Workout/${id}`);
	}
}

export default new WorkoutsPageApi();
