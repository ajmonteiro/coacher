import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';

export type DietType = {
    
};

// {
// 	"name": "string",
// 	"description": "string",
// 	"userId": 0,
// 	"meals": [
// 	  {
// 		"mealId": 0
// 	  }
// 	]
//   }
export class DietModel {
	public userId: number | SelectItem = 0;
	public name: string = '';
	public description: string = '';

	public toModel() {
		return {
			userId: typeof this.userId === 'number' ? this.userId.toString() : parseInt(this.userId.value),
			name: this.name,
			description: this.description,
			meals: []
		};
	}
}

export const dietSchema = object({
	name: string().required(),
	description: string().required()
});

export const useDietModel = () => useForm(DietModel, {
	validate: (form) => dietSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
