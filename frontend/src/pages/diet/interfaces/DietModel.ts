import { useForm } from '@resourge/react-form';
import { array, object, string } from '@resourge/schema';

import { MealModel, mealSchema } from 'src/pages/meal/interfaces/MealModel';
import { type SelectItem } from 'src/shared/models/SelectItem';

export type DietType = {
	description: string
	meals: MealModel[]
	name: string
	userId: string
};

export class DietModel {
	public userId: string | SelectItem = '';
	public name: string = '';
	public description: string = '';
	public meals: MealModel[] = [];

	constructor() {
		this.userId = {
			label: '',
			value: ''
		};
		this.name = '';
		this.description = '';
		this.meals = [];
	}

	public addMeal() {
		this.meals.push(new MealModel());
	}

	public removeMeal(index: number) {
		this.meals.splice(index, 1);
	}

	public toModel() {
		return {
			userId: typeof this.userId === 'string' ? this.userId : this.userId.value,
			name: this.name,
			description: this.description,
			meals: this.meals.map((meal) => meal.toModel())
		};
	}
}

export const dietSchema = object({
	name: string().required(),
	description: string().required(),
	meals: array(mealSchema)
});

export const useDietModel = () => useForm(DietModel, {
	validate: (form) => dietSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
