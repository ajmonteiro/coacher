import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

class LoginModel {
	public username: string = '';
	public password: string = '';

	public toModel() {
		return {
			username: this.username,
			password: this.password
		};
	}
}

export const loginSchema = object<LoginModel>({
	username: string().required(TranslationInstance.K.validations.required),
	password: string().required(TranslationInstance.K.validations.required)
});

export const useLoginModel = () => useForm(LoginModel, {
	validate: (form) => loginSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
