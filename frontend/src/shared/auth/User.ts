import { type BaseUserType } from '@resourge/react-authentication';

type UserType = BaseUserType & {
	fullName: string
	height: string
	id: string
	phone: string
	role: string
	username: string
	weight: string
};

export class User implements BaseUserType {
	public id: string = '';
	public username: string = '';
	public fullName: string = '';
	public phone: string = '';
	public role: string = '';
	public weight: string = '';
	public height: string = '';
	public isAuthenticated?: boolean | undefined;

	constructor(data?: UserType) {
		this.isAuthenticated = true;
		if (data) {
			this.fullName = data.fullName;
			this.height = data.height;
			this.phone = data.phone;
			this.role = data.role;
			this.username = data.username;
			this.weight = data.weight;
			this.id = data.id;
		}
	}
}
