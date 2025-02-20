export type ExerciseType = {
	createdAt: string
	exercise: {
		description: string
		id: string
		name: string
		video?: string
	}

	reps: number
	sets: number
	updatedAt: string
};

export class ExerciseDto {
	public id: string = '';
	public name: string = '';
	public description: string = '';
	public video: string | null = null;
	public createdAt: string = '';
	public updatedAt: string = '';
	public sets: number = 0;
	public reps: number = 0;

	constructor(base: ExerciseType) {
		this.id = base.exercise.id;
		this.name = base.exercise.name;
		this.description = base.exercise.description;
		this.video = base.exercise.video ?? null;
		this.sets = base.sets;
		this.reps = base.reps;
	}
}
