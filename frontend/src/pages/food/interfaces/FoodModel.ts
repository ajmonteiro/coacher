import { useForm } from '@resourge/react-form';
import { array, object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

export type FoodType = {
	calories: string
	carbs: string
	fat: string
	name: string
	protein: string
};

export class FoodModel {
	public foods: FoodType[] = [{
		calories: '',
		carbs: '',
		fat: '',
		name: '',
		protein: ''
	}];

	public addNewFood() {
		this.foods.push({
			calories: '',
			carbs: '',
			fat: '',
			name: '',
			protein: ''
		});
	}

	public removeFood(index: number) {
		this.foods.splice(index, 1);
	}

	public toModel() {
		return this.foods.map((food: FoodType) => ({
			calories: food.calories,
			carbs: food.carbs,
			fat: food.fat,
			name: food.name,
			protein: food.protein
		}));
	}
}

export const foodSchema = object<FoodModel>({
	foods: array(
		object({
			calories: string().required(TranslationInstance.K.validations.required),
			carbs: string().required(TranslationInstance.K.validations.required),
			fat: string().required(TranslationInstance.K.validations.required),
			name: string().required(TranslationInstance.K.validations.required),
			protein: string().required(TranslationInstance.K.validations.required)
		})
	).required()
}).compile();

export const useFoodModel = () => useForm<FoodModel>(new FoodModel(), {
	validate: (form) => foodSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
