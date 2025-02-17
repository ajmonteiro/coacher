import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { PhoneModel, phoneSchema } from 'src/shared/interfaces/PhoneModel';
import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';
import { schemaPassword } from 'src/shared/utils/ValidationUtils';

export class ClientModel {
	public fullName: string = '';
	public height: string = '';
	public phone: PhoneModel = new PhoneModel();
	public password: string = '';
	public username: string = '';
	public weight: string = '';
	public role: SelectItem = {
		label: '',
		value: ''
	};

	public toModel() {
		return { 
			username: this.username,
			fullName: this.fullName,
			phone: `${this.phone.code.label}${this.phone.number}`,
			password: this.password,
			weight: this.weight,
			height: this.height,
			roleId: this.role.value,
			workouts: []
		};
	}
}

export const clientSchema = object<ClientModel>({
	fullName: string().required(TranslationInstance.K.validations.required),
	height: string().required(TranslationInstance.K.validations.required),
	phone: phoneSchema,
	username: string().required(TranslationInstance.K.validations.required),
	password: schemaPassword,
	weight: string().required(TranslationInstance.K.validations.required),
	role: object<SelectItem>().required(TranslationInstance.K.validations.required)
});

export const useClientModel = () => useForm(ClientModel, {
	validate: (form) => clientSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
