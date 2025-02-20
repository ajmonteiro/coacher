import { useForm } from '@resourge/react-form';
import { array, object } from '@resourge/schema';

import { workoutExerciseSchema, type WorkoutExerciseModel } from './WorkoutExerciseModel';

export class RegisterRecordModel {
	public exercises: WorkoutExerciseModel[] = [];

	public toModel() {
		return {
			exercises: this.exercises.map((exercise) => exercise.toModel())
		};
	}
}

export const registerWorkoutSchema = object<RegisterRecordModel>({
	exercises: array(workoutExerciseSchema)
}).compile();

export const useRegisterRecordModel = () => useForm(RegisterRecordModel, {
	validate: (form) => registerWorkoutSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
