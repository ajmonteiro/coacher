// Types para definir a estrutura dos dados
export type Exercise = {
	description: string
	id: string
	name: string
	video: string
};

export type WorkoutExercise = {
	exercise: Exercise
	exerciseId: string
	id: string
	reps: number
	sets: number
	workoutId: string
};

export type Workout = {
	description: string
	id: string
	name: string
	weekDay: string
	workoutExercises: WorkoutExercise[]
	workoutPlanId: string
};

export type WorkoutPlanDetailType = {
	endDate: string
	id: string
	name: string
	startDate: string
	userId: string
	workouts: Workout[]
};

export class WorkoutPlanDetailDto {
	public id: string = '';
	public name: string = '';
	public userId: string = '';
	public startDate: Date = new Date();
	public endDate: Date = new Date();
	public workouts: Workout[] = [];

	constructor(base?: WorkoutPlanDetailType) {
		if (base) {
			this.id = base.id;
			this.name = base.name;
			this.userId = base.userId;
			this.startDate = new Date(base.startDate);
			this.endDate = new Date(base.endDate);
			this.workouts = base.workouts;
		}
	}

	public get formattedStartDate() {
		return this.startDate.toLocaleDateString();
	}

	public get formattedEndDate() {
		return this.endDate.toLocaleDateString();
	}
}
