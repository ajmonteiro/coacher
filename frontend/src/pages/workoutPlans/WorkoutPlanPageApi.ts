import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

import { type WorkoutPlanModel } from './interfaces/WorkoutPlanModel';

class WorkoutPlanPageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/WorkoutPlan
			${pagination.perPage ? `
				?perPage=${pagination.perPage}
				&page=${pagination.page}` : ''}
		`);
	}

	public async create(data: WorkoutPlanModel): Promise<any> {
		return await HttpBaseService.post('/WorkoutPlan', data.toModel());
	}
	
	public async delete(id: string): Promise<any> {
		return await HttpBaseService.delete(`/WorkoutPlan/${id}`);
	}
}

export default new WorkoutPlanPageApi();
