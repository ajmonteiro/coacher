export type ExerciseType = {
	id: number
	name: string
	reps: number
	sets: number
	video: string
	description?: string
};

export class ExerciseDto {
	public description?: string = '';
	public id: number = 0;
	public name: string = '';
	public reps: number = 0;
	public sets: number = 0;
	public video: string = '';

	constructor(base: ExerciseType) {
		this.description = base.description;
		this.id = base.id;
		this.name = base.name;
		this.reps = base.reps;
		this.sets = base.sets;
		this.video = base.video;
	}
}
