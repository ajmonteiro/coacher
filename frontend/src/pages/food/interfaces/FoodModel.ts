import { useForm } from '@resourge/react-form';
import { number, object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

export class FoodModel {
	public name: string = '';
	public calories: string = '';
	public carbs: string = '';
	public fat: string = '';
	public protein: string = '';

	public toModel() {
		return {
			name: this.name,
			calories: this.calories,
			carbs: this.carbs,
			fat: this.fat,
			protein: this.protein
		};
	}
}

export const foodSchema = object<FoodModel>({
	name: string().required(TranslationInstance.K.validations.required),
	calories: string().required(TranslationInstance.K.validations.required),
	carbs: string().required(TranslationInstance.K.validations.required),
	fat: string().required(TranslationInstance.K.validations.required),
	protein: string().required(TranslationInstance.K.validations.required)
}).compile();

export const useFoodModel = () => useForm<FoodModel>(new FoodModel(), {
	validate: (form) => foodSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
