import { useForm } from '@resourge/react-form';
import {
	array,
	date,
	object,
	string
} from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';

import { workoutSchema, WorkoutModel } from './WorkoutModel';

export class WorkoutPlanModel {
	public name: string = '';
	public userId: string | SelectItem = '';

	public dates: {
		from: Date
		to: Date
	} = {
			from: new Date(),
			to: new Date()
		};

	public workouts: WorkoutModel[] = [];

	public addNewWorkout() {
		this.workouts.push(new WorkoutModel({
			userId: this.userId as any
		}));
	}

	public toModel() {
		return {
			name: this.name,
			userId: typeof this.userId === 'string' ? this.userId : this.userId.value,
			startDate: this.dates.from,
			endDate: this.dates.to,
			workouts: this.workouts.map((workout) => workout.toModel())
		};
	}
}

export const workoutPlanSchema = object<WorkoutPlanModel>({
	name: string().required(),
	dates: object({
		from: date().required(),
		to: date().required()
	}).required(),
	workouts: array(workoutSchema)
});

export const useWorkoutPlanModel = () => useForm(WorkoutPlanModel, {
	validate: (form) => workoutPlanSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
