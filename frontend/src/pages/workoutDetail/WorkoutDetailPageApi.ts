import { type WorkoutType } from 'src/shared/models/WorkoutDto';
import HttpBaseService from 'src/shared/services/HttpBaseService';

class WorkoutDetailPageApi {
	public async get(workoutId: string): Promise<{ data: WorkoutType }> {
		return await HttpBaseService.get(`/Workout/${workoutId}`);
	}

	public async registerSet(data: any): Promise<void> {
		return await HttpBaseService.post('/SetRecord', data);
	}
}

export default new WorkoutDetailPageApi();
