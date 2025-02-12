import { useForm } from '@resourge/react-form';
import { array, object, string } from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';

export type WorkoutType = {
	description: string
	name: string
	userId: number
};

type ExerciseType = { 
	exercise: SelectItem
	reps?: string
	sets?: string
};

export class WorkoutModel {
	public description: string = '';
	public name: string = '';
	public userId: number | SelectItem = 0;
	public exercises: ExerciseType[] = [
		{
			exercise: {
				label: '',
				value: ''
			}
		}
	];

	public addNewExercise() {
		this.exercises.push({
			exercise: {
				label: '',
				value: ''
			}
		});
	}

	public removeExercise(index: number) {
		this.exercises.splice(index, 1);
	}

	public toModel() {
		return {
			description: this.description,
			name: this.name,
			exercises: this.exercises.map((exercise) => ({
				exerciseId: parseInt(exercise.exercise.value),
				sets: exercise.sets,
				reps: exercise.reps
			})),
			userId: typeof this.userId === 'number' ? this.userId.toString() : parseInt(this.userId.value)
		};
	}
}

export const workoutSchema = object<WorkoutModel>({
	description: string().required(TranslationInstance.K.validations.required),
	exercises: array(object<ExerciseType>({
		exercise: object<SelectItem>(),
		reps: string().required(TranslationInstance.K.validations.required),
		sets: string().required(TranslationInstance.K.validations.required)
	})).min(1),
	name: string().required(TranslationInstance.K.validations.required)
}).compile();

export const useWorkoutModel = () => useForm(WorkoutModel, {
	validate: (form) => workoutSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
