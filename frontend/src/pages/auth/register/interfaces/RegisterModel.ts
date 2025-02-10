import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

class RegisterModel {
	public username: string = '';
	public fullName: string = '';
	public phone: string = '';
	public password: string = '';
	public weight: string = '';
	public height: string = '';

	public toModel() {
		return {
			username: this.username,
			fullName: this.fullName,
			phone: this.phone,
			password: this.password,
			weight: this.weight,
			height: this.height,
			role: 'User'
		};
	}
}

export const registerSchema = object<RegisterModel>({
	username: string().required(TranslationInstance.K.validations.required),
	fullName: string().required(TranslationInstance.K.validations.required),
	phone: string().required(TranslationInstance.K.validations.required),
	password: string().required(TranslationInstance.K.validations.required),
	weight: string().required(TranslationInstance.K.validations.required),
	height: string().required(TranslationInstance.K.validations.required)
});

export const useRegisterModel = () => useForm(RegisterModel, {
	validate: (form) => registerSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
