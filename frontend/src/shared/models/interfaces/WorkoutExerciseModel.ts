import {
	number,
	object,
	string,
	array
} from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

import { SetModel } from './SetModel';

export class WorkoutExerciseModel {
	public exerciseId: string = '';
	public userId: string = '';
	public sets: SetModel[] = [new SetModel()];
	public name: string = ''; 

	constructor(data: {
		exerciseId: string
		userId: string
		name?: string
		sets?: SetModel[] 
	}) {
		this.exerciseId = data.exerciseId;
		this.userId = data.userId;
		this.sets = data.sets ?? [];
		this.name = data.name ?? '';
	}

	public toModel() {
		return {
			exerciseId: this.exerciseId,
			userId: this.userId,
			sets: this.sets.map((set) => set.toModel()),
			name: this.name
		};
	}
}

export const workoutExerciseSchema = object<WorkoutExerciseModel>({
	exerciseId: string().required(TranslationInstance.K.validations.required),
	userId: string().required(TranslationInstance.K.validations.required),
	sets: array(object<SetModel>({
		id: string().required(TranslationInstance.K.validations.required),
		reps: number().required(TranslationInstance.K.validations.required),
		weight: number().required(TranslationInstance.K.validations.required)
	})).min(1),
	name: string().required(TranslationInstance.K.validations.required) // Validate name
});
