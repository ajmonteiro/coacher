import { number, object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

export class SetModel {
	public id: string = '';
	public reps: number = 0;
	public weight: number = 0;

	constructor(data: {
		id?: string
		reps?: number
		weight?: number
	} = {}) {
		this.id = data.id ?? '';
		this.reps = data.reps ?? 0;
		this.weight = data.weight ?? 0;
	}

	public toModel() {
		return {
			id: this.id,
			reps: this.reps,
			weight: this.weight
		};
	}
}

export const setSchema = object<SetModel>({
	id: string().required(TranslationInstance.K.validations.required),
	reps: number(),
	weight: number()
}).compile();
