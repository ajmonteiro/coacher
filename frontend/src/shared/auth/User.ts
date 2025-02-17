import { type BaseUserType } from '@resourge/react-authentication';

type PermissionType = {
	name: string
};

type UserType = BaseUserType & {
	diets: any[]
	fullName: string
	height: string
	id: string
	permissions: PermissionType[]
	phone: string
	role: {
		id: string
		name: string
	}
	username: string
	weight: string
	workouts: any[]
};

export class User implements BaseUserType {
	public id: string = '';
	public username: string = '';
	public fullName: string = '';
	public phone: string = '';
	public role: {
		id: string
		name: string
	} = {
			id: '',
			name: ''
		};

	public weight: string = '';
	public height: string = '';
	public diets: any[] = [];
	public workouts: any[] = [];
	public isAuthenticated?: boolean | undefined;
	public permissions: string[] = [];

	constructor(data?: UserType) {
		if (data) {
			this.isAuthenticated = true;
			this.fullName = data.fullName;
			this.height = data.height;
			this.phone = data.phone;
			this.role = data.role;
			this.username = data.username;
			this.weight = data.weight;
			this.id = data.id;
			this.workouts = data.workouts;
			this.diets = data.diets;
			this.permissions = data.permissions.map((permission) => (permission.name));
		}
	}

	public hasPermission(permission: string) {
		return this.permissions.includes(permission);
	}
}
