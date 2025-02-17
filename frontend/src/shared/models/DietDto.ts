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
	dietId: string
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

export class MealFoodDto {
	public foodId: string;
	public foodName: string;
	public quantity: number;
	public unit: string;
	public calories: number;
	public protein: number;
	public fat: number;
	public carbs: number;

	constructor(base: MealFoodType) {
		this.foodId = base.foodId;
		this.foodName = base.foodName;
		this.quantity = base.quantity;
		this.unit = base.unit;
		this.calories = base.calories;
		this.protein = base.protein;
		this.fat = base.fat;
		this.carbs = base.carbs;
	}
}

export class MealDto {
	public id: string;
	public name: string;
	public dietId: string;
	public description: string;
	public mealFoods: MealFoodDto[];

	constructor(base: MealType) {
		this.id = base.id;
		this.name = base.name;
		this.dietId = base.dietId;
		this.description = base.description;
		this.mealFoods = base.mealFoods.map((food) => new MealFoodDto(food));
	}
}

export class DietDto {
	public id: string;
	public userId: string;
	public name: string;
	public description: string;
	public meals: MealDto[];

	constructor(base: DietType) {
		this.id = base.id;
		this.userId = base.userId;
		this.name = base.name;
		this.description = base.description;
		this.meals = base.meals.map((meal) => new MealDto(meal));
	}
}
