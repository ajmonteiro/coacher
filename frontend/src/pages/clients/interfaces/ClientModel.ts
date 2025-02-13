import { useForm } from '@resourge/react-form';
import { object } from '@resourge/schema';

type UserType = {
	fullName: string
	height: string
	phone: string
	username: string
	weight: string
};
export class ClientModel {
	public user?: UserType = {
		fullName: '',
		height: '',
		phone: '',
		username: '',
		weight: ''
	};

	public toModel() {
		return { 
			username: this.user?.username,
			fullName: this.user?.fullName,
			phone: this.user?.phone,
			weight: this.user?.weight,
			height: this.user?.height,
			workouts: []
		};
	}
}

export const clientSchema = object<ClientModel>({});

export const useClientModel = () => useForm(ClientModel, {
	validate: (form) => clientSchema.validate(form),
	validateOnlyAfterFirstSubmit: true
});
