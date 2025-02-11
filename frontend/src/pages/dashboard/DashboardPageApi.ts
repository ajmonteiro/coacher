import HttpBaseService from 'src/shared/services/HttpBaseService';

type DashboardDataResponse = {
	data: {
		totalFoods: number
		totalUsers: number
	}
};

class DashboardPageApi {
	public async getDashboardData(): Promise<DashboardDataResponse> {
		return await HttpBaseService.get('/Dashboard/stats');
	}
}

export default new DashboardPageApi();
