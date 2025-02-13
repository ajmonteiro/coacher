import { useForm } from '@resourge/react-form';
import { object } from '@resourge/schema';

export type MealType = {
    
};

// {
//     "id": 0,
//     "name": "string",
//     "description": "string",
//     "foodIds": [
//       0
//     ],
//     "dietId": 0
//   }
export class MealModel {
	public userId: string = '';
	public name: string = '';
	public description: string = '';

	public toModel() {
		return {
			userId: this.userId,
			name: this.name,
			description: this.description
		};
	}
}

export const mealSchema = object({});

export const useMealModel = () => useForm(MealModel, {
	validate: (form) => mealSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
