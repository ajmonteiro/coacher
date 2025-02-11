import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { TranslationInstance } from 'src/shared/translations/Translations';

import { confirmPassword, schemaPassword } from '../utils/ValidationUtils';

export class PasswordFormModel {
	public oldPassword: string = '';
	public password: string = '';
	public confirmPassword: string = '';

	public toModel() {
		return {
			old_password: this.oldPassword,
			new_password: this.password
		};
	}
}

export const passwordSchema = object<PasswordFormModel>({
	oldPassword: string().required(TranslationInstance.K.validations.required),
	password: schemaPassword,
	confirmPassword
}).compile();

export const useChangePasswordFormModel = () => useForm(
	PasswordFormModel,
	{
		validate: (form) => passwordSchema.validate(form),
		validateOnlyAfterFirstSubmit: true
	}
);
