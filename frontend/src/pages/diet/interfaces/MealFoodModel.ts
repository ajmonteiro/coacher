import { object } from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';
import { FOOD_UNIT_OPTIONS } from 'src/shared/utils/FormConstantsUtils';
import { selectItemSchema } from 'src/shared/utils/ValidationUtils';

export class MealFoodModel {
	public food: SelectItem = {
		value: '',
		label: ''
	};

	public quantity: number = 0;
	public unit: SelectItem = FOOD_UNIT_OPTIONS[0];

	constructor(data?: MealFoodModel) {
		if (data) {
			this.food = data.food;
			this.quantity = data.quantity;
			this.unit = data.unit;
		}
	}

	public toModel() {
		return {
			foodId: this.food.value,
			quantity: Number(this.quantity),
			unit: this.unit.value
		};
	}
}

export const mealFoodSchema = object<MealFoodModel>({
	food: selectItemSchema().required(TranslationInstance.K.validations.required),
	unit: selectItemSchema().required(TranslationInstance.K.validations.required)
});
