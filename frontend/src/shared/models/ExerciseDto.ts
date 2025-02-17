export type ExerciseType = {
	name: string
	reps: number
	set: number
};

export class ExerciseDto {
	public name: string = '';
	public reps: number = 0;
	public set: number = 0;

	constructor(base: ExerciseType) {
		this.name = base.name;
		this.reps = base.reps;
		this.set = base.set;
	}
}
