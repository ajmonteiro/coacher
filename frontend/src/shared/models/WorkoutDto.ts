import { ExerciseDto, type ExerciseType } from './ExerciseDto';

export type WorkoutType = {
	description: string
	exercises: ExerciseType[]
	name: string
	userId?: number
};

export class WorkoutDto {
	public description: string = '';
	public exercises: ExerciseDto[] = [];
	public name: string = '';
	public userId: number = 0;
	public keyIndex: number = 0;
    
	constructor(base: WorkoutType) {
		this.description = base.description;
		this.name = base.name;
		this.userId = base.userId ?? 0;
		this.exercises = base.exercises.map((exercise) => new ExerciseDto(exercise));
		this.keyIndex = Math.random();
	}
}
