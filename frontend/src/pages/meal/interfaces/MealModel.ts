import { useForm } from '@resourge/react-form';
import { array, object, string } from '@resourge/schema';

import { MealFoodModel, mealFoodSchema } from 'src/pages/diet/interfaces/MealFoodModel';
import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';

export type MealType = {
	description: string
	foods: SelectItem[]
	name: string
	userId: string
};

export class MealModel {
	public name: string = '';
	public description: string = '';
	public mealFoods: MealFoodModel[] = [new MealFoodModel()];
	
	public addMealFood() {
		this.mealFoods.push(new MealFoodModel());
	}

	public removeMealFood(index: number) {
		this.mealFoods.splice(index, 1);
	}

	public toModel() {
		return {
			name: this.name,
			description: this.description,
			mealFoods: this.mealFoods.map((mealFood: MealFoodModel) => mealFood.toModel())
		};
	}
}

export const mealSchema = object({
	name: string().required(TranslationInstance.K.validations.required),
	description: string().required(TranslationInstance.K.validations.required),
	mealFoods: array(mealFoodSchema)
});

export const useMealModel = () => useForm(MealModel, {
	validate: (form) => mealSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
