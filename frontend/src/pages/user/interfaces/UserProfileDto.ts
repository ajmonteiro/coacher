import { DietDto, type DietType } from 'src/shared/models/DietDto';
import { WorkoutDto, type WorkoutType } from 'src/shared/models/WorkoutDto';

export type UserProfileType = {
	diets: DietType[]
	fullName: string
	height: string
	roleName: string
	username: string
	weight: string
	workoutPlans: WorkoutType[]
};

export class UserProfileDto {
	public diets: DietDto[] = [];
	public fullName: string = '';
	public height: string = '';
	public role: string = '';
	public username: string = '';
	public weight: string = '';
	public workouts: WorkoutDto[] = [];

	constructor(data: UserProfileType) {
		this.diets = data.diets.map((diet) => new DietDto(diet));
		this.fullName = data.fullName;
		this.height = data.height;
		this.role = data.roleName;
		this.username = data.username;
		this.weight = data.weight;
		this.workouts = data.workoutPlans.map((workout) => new WorkoutDto(workout));
	}
}
