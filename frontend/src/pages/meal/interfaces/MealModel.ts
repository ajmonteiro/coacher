import { useForm } from '@resourge/react-form';
import { object } from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';
import { FOOD_UNIT_OPTIONS } from 'src/shared/utils/FormConstantsUtils';

export type MealType = {
	description: string
	foods: SelectItem[]
	name: string
	userId: string
};

type MealFoodType = {
	food: SelectItem
	quantity: number
	unit: SelectItem
};

export class MealModel {
	public name: string = '';
	public description: string = '';
	public mealFoods: MealFoodType[] = [];

	constructor() {
		this.addMealFood();
	}

	public addMealFood() {
		this.mealFoods.push({
			food: {
				value: '',
				label: '' 
			},
			quantity: 0,
			unit: FOOD_UNIT_OPTIONS[0]
		});
	}

	public removeMealFood(index: number) {
		this.mealFoods.splice(index, 1);
	}

	public toModel() {
		return {
			name: this.name,
			description: this.description,
			foods: this.mealFoods.map((mealFood: MealFoodType) => ({
				foodId: mealFood.food.value,
				quantity: Number(mealFood.quantity),
				unit: mealFood.unit.value
			}))
		};
	}
}

export const mealSchema = object({});

export const useMealModel = () => useForm(MealModel, {
	validate: (form) => mealSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
