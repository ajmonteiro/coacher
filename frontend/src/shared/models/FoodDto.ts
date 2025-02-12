export type FoodType = {
	calories: number
	carbs: number
	fat: number
	id: number
	name: string
	protein: number
};

export class FoodDto {
	public calories: number = 0;
	public carbs: number = 0;
	public fat: number = 0;
	public id: number = 0;
	public name: string = '';
	public protein: number = 0;

	constructor(base: FoodType) {
		this.calories = base.calories;
		this.carbs = base.carbs;
		this.fat = base.fat;
		this.id = base.id;
		this.name = base.name;
		this.protein = base.protein;
	}
}
