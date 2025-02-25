import { type WorkoutType } from 'src/shared/models/WorkoutDto';
import HttpBaseService from 'src/shared/services/HttpBaseService';

class WorkoutDetailPageApi {
	public async get(workoutId: string): Promise<{ data: WorkoutType }> {
		return await HttpBaseService.get(`/Workout/${workoutId}`);
	}
}

export default new WorkoutDetailPageApi();
