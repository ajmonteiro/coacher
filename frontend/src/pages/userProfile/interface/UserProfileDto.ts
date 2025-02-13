export type UserProfileType = {
	diets: any[]
	fullName: string
	height: string
	role: string
	username: string
	weight: string
	workouts: any[]
};

export class UserProfileDto {
	public diets: any[] = [];
	public fullName: string = '';
	public height: string = '';
	public role: string = '';
	public username: string = '';
	public weight: string = '';
	public workouts: any[] = [];

	constructor(data: UserProfileType) {
		this.diets = data.diets;
		this.fullName = data.fullName;
		this.height = data.height;
		this.role = data.role;
		this.username = data.username;
		this.weight = data.weight;
		this.workouts = data.workouts;
	}
}
