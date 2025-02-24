import HttpBaseService from 'src/shared/services/HttpBaseService';

class WorkoutPlanDetailPageApi {
	public async get(id: string): Promise<any> {
		return await HttpBaseService.get(`/WorkoutPlan/${id}`);
	}
}

export default new WorkoutPlanDetailPageApi();
