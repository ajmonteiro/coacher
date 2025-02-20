export type SetType = {
	id: string
	reps: number
	weight?: number
};

export class SetDto {
	public reps: number = 0;
	public id: string = '';
	public weight?: number;

	constructor(base: SetType) {
		this.reps = base.reps;
		this.id = base.id;
		this.weight = base.weight;
	}
}
