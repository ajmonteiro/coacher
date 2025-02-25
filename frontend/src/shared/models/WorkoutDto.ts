import { ExerciseDto, type ExerciseType } from './ExerciseDto';

export type WorkoutType = {
	createdAt: string
	description: string
	id: string
	name: string
	updatedAt: string
	weekDay: string
	workoutPlanId: string
	exercises?: any[]
	workoutExercises?: ExerciseType[]
};

export class WorkoutDto {
	public id: string = '';
	public description: string = '';
	public name: string = '';
	public weekDay: string = '';
	public workoutPlanId: string = '';
	public exercises: ExerciseDto[] = [];
	public createdAt: string = '';
	public updatedAt: string = '';
	public keyIndex: number = 0;
	public exercisesWorkout: any[] = [];

	constructor(base: WorkoutType) {
		this.id = base.id;
		this.description = base.description;
		this.name = base.name;
		this.weekDay = base.weekDay;
		this.workoutPlanId = base.workoutPlanId;
		this.exercises = base.workoutExercises ? base.workoutExercises.map((exercise) => new ExerciseDto(exercise)) : [];
		this.exercisesWorkout = base.exercises ?? [];
		this.createdAt = base.createdAt;
		this.updatedAt = base.updatedAt;
		this.keyIndex = Math.random();
	}
}
