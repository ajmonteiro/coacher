import { useForm } from '@resourge/react-form';
import { array, object, string } from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';
import { selectItemSchema } from 'src/shared/utils/ValidationUtils';

export type WorkoutType = {
	description: string
	name: string
	userId: string
	exercises?: ExerciseType[]
	weekDay?: string
};

type ExerciseType = { 
	exercise: SelectItem
	reps?: string
	sets?: string
};

export class WorkoutModel {
	public description: string = '';
	public name: string = '';
	public userId: string | SelectItem = '';
	public weekDay: SelectItem = {
		label: '',
		value: ''
	};

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
				exerciseId: exercise.exercise.value,
				sets: exercise.sets,
				reps: exercise.reps
			})),
			weekDay: this.weekDay.value,
			userId: typeof this.userId === 'string' ? this.userId : this.userId.value
		};
	}
}

export const workoutSchema = object<WorkoutModel>({
	description: string().required(TranslationInstance.K.validations.required),
	exercises: array(object<ExerciseType>({
		exercise: selectItemSchema().required(TranslationInstance.K.validations.required),
		reps: string().required(TranslationInstance.K.validations.required),
		sets: string().required(TranslationInstance.K.validations.required)
	})).min(1),
	weekDay: selectItemSchema().required(TranslationInstance.K.validations.required),
	name: string().required(TranslationInstance.K.validations.required)
}).compile();

export const useWorkoutModel = () => useForm(WorkoutModel, {
	validate: (form) => workoutSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
