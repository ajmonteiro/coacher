import { array, object, string } from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';
import { WEEKDAY_OPTIONS } from 'src/shared/utils/FormConstantsUtils';
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
	public weekDay: SelectItem = WEEKDAY_OPTIONS[0];

	public exercises: ExerciseType[] = [
		{
			exercise: {
				label: '',
				value: ''
			}
		}
	];

	constructor(data?: Partial<WorkoutType>) {
		this.description = data?.description ?? '';
		this.name = data?.name ?? '';
		this.userId = data?.userId ?? '';
		this.weekDay = data?.weekDay ? {
			label: data.weekDay,
			value: data.weekDay
		} : {
			label: '',
			value: ''
		};
		this.exercises = data?.exercises?.map((exercise) => ({
			exercise: {
				label: exercise.exercise.label,
				value: exercise.exercise.value
			},
			reps: exercise.reps,
			sets: exercise.sets
		})) ?? [];
	}

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
				sets: Array.from({
					length: parseInt(exercise.sets!) || 0 
				}, () => ({ 
					reps: parseInt(exercise.reps!) || 0
				}))
			})),
			weekDay: this.weekDay.value
		};
	}
}

export const workoutSchema = object<WorkoutModel>({
	description: string().required(TranslationInstance.K.validations.required),
	exercises: array(object<ExerciseType>({
		exercise: selectItemSchema().required(TranslationInstance.K.validations.required),
		reps: string().required(TranslationInstance.K.validations.required),
		sets: string().required(TranslationInstance.K.validations.required)
	})),
	weekDay: selectItemSchema().required(TranslationInstance.K.validations.required),
	name: string().required(TranslationInstance.K.validations.required)
}).compile();
