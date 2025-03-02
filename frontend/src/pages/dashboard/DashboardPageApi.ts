import HttpBaseService from 'src/shared/services/HttpBaseService';

type DashboardDataResponse = {
	data: {
		exerciseCount: number
		foodCount: number
		userCount: number
		users: any
		workoutPlanCount: number
	}
};

class DashboardPageApi {
	public async getDashboardData(): Promise<DashboardDataResponse> {
		return await HttpBaseService.get('/Dashboard/stats');
	}
}

export default new DashboardPageApi();
