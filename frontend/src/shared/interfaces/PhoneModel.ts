import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { type SelectItem } from '../models/SelectItem';
import { TranslationInstance } from '../translations/Translations';
import { PHONE_CODES } from '../utils/FormConstantsUtils';
import { selectItemSchema } from '../utils/ValidationUtils';

export class PhoneModel {
	public code: SelectItem = PHONE_CODES[0];
	public number: string = '';
}

export const phoneSchema = object<PhoneModel>({
	code: selectItemSchema().required(TranslationInstance.T.validations.required),
	number: string().required(TranslationInstance.T.validations.required)
}).compile();

export const usePhoneModel = () => useForm(PhoneModel, {
	validate: (form) => phoneSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
