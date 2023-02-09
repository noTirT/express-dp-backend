export interface FoodDTO {
	name: string;
	description: string | null;
	type: string;
	category: string;
}

export interface FoodDBO extends FoodDTO {
	id: string;
}

export interface DietTypeDTO {
	name: string;
}

export interface DietTypeDBO extends DietTypeDTO {
	id: string;
}

export interface FoodCategoryDTO {
	name: string;
}

export interface FoodCategoryDBO extends FoodCategoryDTO {
	id: string;
}
