export type MealFoodType = {
	calories: number
	carbs: number
	fat: number
	foodId: string
	foodName: string
	protein: number
	quantity: number
	unit: string
};

export type MealType = {
	description: string
	id: string
	mealFoods: MealFoodType[]
	name: string
};

export type DietType = {
	description: string
	id: string
	meals: MealType[]
	name: string
	userId: string
};

export type UserProfileType = {
	diets: DietType[]
	fullName: string
	height: string
	roleName: string
	username: string
	weight: string
	workouts: any[]
};

export class UserProfileDto {
	public diets: DietType[] = [];
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
		this.role = data.roleName;
		this.username = data.username;
		this.weight = data.weight;
		this.workouts = data.workouts;
	}
}
