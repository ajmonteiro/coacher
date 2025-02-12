import { useForm } from '@resourge/react-form';
import { array, object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

export type ExerciseType = {
	description: string
	name: string
	video?: string
};

export class ExerciseModel {
	public exercises: ExerciseType[] = [{
		description: '',
		name: ''
	}];

	public addNewExercise() {
		this.exercises.push({
			description: '',
			name: ''
		});
	}

	public removeExercise(index: number) {
		this.exercises.splice(index, 1);
	}

	public toModel() {
		return this.exercises.map((exercise: ExerciseType) => ({
			description: exercise.description,
			name: exercise.name,
			video: exercise.video
		}));
	}
}

export const exerciseSchema = object<ExerciseModel>({
	exercises: array(
		object({
			description: string().required(TranslationInstance.K.validations.required),
			name: string().required(TranslationInstance.K.validations.required)
		})
	).required()
	
}).compile();

export const useExerciseModel = () => useForm<ExerciseModel>(new ExerciseModel(), {
	validate: (form) => exerciseSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
