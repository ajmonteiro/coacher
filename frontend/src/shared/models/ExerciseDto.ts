import { type SetType, SetDto } from './SetDto';

export type ExerciseType = {
	exerciseId: string
	name: string
	sets: SetType[]
};

export class ExerciseDto {
	public exerciseId: string = '';
	public name: string = '';
	public sets: SetDto[] = [];

	constructor(base: ExerciseType) {
		this.exerciseId = base.exerciseId;
		this.name = base.name;
		this.sets = base.sets.map((set) => new SetDto(set)); 
	}
}
