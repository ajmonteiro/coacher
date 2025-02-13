import HttpBaseService from 'src/shared/services/HttpBaseService';

type DashboardDataResponse = {
	data: {
		totalExercises: number
		totalFoods: number
		totalUsers: number
		Users: any
	}
};

class DashboardPageApi {
	public async getDashboardData(): Promise<DashboardDataResponse> {
		return await HttpBaseService.get('/Dashboard/stats');
	}
}

export default new DashboardPageApi();
