import { WorkoutDto, type WorkoutType } from '../WorkoutDto';

export type WorkoutPlanType = {
	endDate: string
	id: string
	name: string
	startDate: string
	userId: string
	workouts: WorkoutType[]
};

export class WorkoutPlanDto {
	public id: string = '';
	public name: string = '';
	public userId: string = '';
	public startDate: string = '';
	public endDate: string = '';
	public workouts: WorkoutDto[] = [];

	constructor(base: WorkoutPlanType) {
		this.id = base.id;
		this.name = base.name;
		this.userId = base.userId;
		this.startDate = base.startDate;
		this.endDate = base.endDate;
		this.workouts = base.workouts.map((workout) => new WorkoutDto(workout));
	}
}
