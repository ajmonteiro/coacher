import { type BaseUserType } from '@resourge/react-authentication';

import { WorkoutPlanDto, type WorkoutPlanType } from '../models/interfaces/WorkoutPlanDto';

type PermissionType = {
	permissionName: string
};

type UserType = BaseUserType & {
	diets: any[]
	fullName: string
	height: string
	id: string
	phone: string
	role: {
		id: string
		name: string
	}
	username: string
	userPermissions: PermissionType[]
	weight: string
	workoutPlans?: WorkoutPlanType[]
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
	public workoutPlans?: WorkoutPlanDto[] = [];
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
			this.workoutPlans = data.workoutPlans?.map((workoutPlan) => new WorkoutPlanDto(workoutPlan)) ?? [];
			this.diets = data.diets;
			this.permissions = data.userPermissions.map((permission) => (permission.permissionName));
		}
	}

	public hasPermission(permission: string) {
		return this.permissions.includes(permission);
	}
}
