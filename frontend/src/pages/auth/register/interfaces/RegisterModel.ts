import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';
import { confirmPassword, schemaPassword } from 'src/shared/utils/ValidationUtils';

export class RegisterModel {
	public username: string = '';
	public fullName: string = '';
	public phone: string = '';
	public password: string = '';
	public confirmPassword: string = '';
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
	password: schemaPassword,
	confirmPassword,
	weight: string().required(TranslationInstance.K.validations.required),
	height: string().required(TranslationInstance.K.validations.required)
}).compile();

export const useRegisterModel = () => useForm(RegisterModel, {
	validate: (form) => registerSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
