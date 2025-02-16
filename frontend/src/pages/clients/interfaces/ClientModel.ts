import { useForm } from '@resourge/react-form';
import { object, string } from '@resourge/schema';

import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';
import { schemaPassword } from 'src/shared/utils/ValidationUtils';

type UserType = {
	fullName: string
	height: string
	password: string
	phone: string
	role: SelectItem
	username: string
	weight: string
};
export class ClientModel {
	public user?: UserType = {
		fullName: '',
		height: '',
		phone: '',
		password: '',
		username: '',
		weight: '',
		role: {
			label: '',
			value: ''
		}
	};

	public toModel() {
		return { 
			username: this.user?.username,
			fullName: this.user?.fullName,
			phone: this.user?.phone,
			password: this.user?.password,
			weight: this.user?.weight,
			height: this.user?.height,
			roleId: this.user?.role.value,
			workouts: []
		};
	}
}

export const clientSchema = object<ClientModel>({
	user: object<UserType>({
		fullName: string().required(TranslationInstance.K.validations.required),
		height: string().required(TranslationInstance.K.validations.required),
		phone: string().required(TranslationInstance.K.validations.required),
		username: string().required(TranslationInstance.K.validations.required),
		password: schemaPassword,
		weight: string().required(TranslationInstance.K.validations.required),
		role: object<SelectItem>().required(TranslationInstance.K.validations.required)
	})
});

export const useClientModel = () => useForm(ClientModel, {
	validate: (form) => clientSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
