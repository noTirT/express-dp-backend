import { z } from "zod";

export const FoodDTOSchema = z
	.object({
		name: z.string(),
		description: z.optional(z.string()),
		type: z.string(),
		category: z.string(),
	})
	.strict();

export type FoodDTO = z.infer<typeof FoodDTOSchema>;

export const FoodDBOSchema = FoodDTOSchema.extend({
	id: z.string(),
});

export type FoodDBO = z.infer<typeof FoodDBOSchema>;

export const DietTypeDTOSchema = z
	.object({
		name: z.string(),
	})
	.strict();

export type DietTypeDTO = z.infer<typeof DietTypeDTOSchema>;

export const DietTypeDBOSchema = DietTypeDTOSchema.extend({
	id: z.string(),
});

export type DietTypeDBO = z.infer<typeof DietTypeDBOSchema>;

export const FoodCategoryDTOSchema = z
	.object({
		name: z.string(),
	})
	.strict();

export type FoodCategoryDTO = z.infer<typeof FoodCategoryDTOSchema>;

export const FoodCategoryDBOSchema = FoodCategoryDTOSchema.extend({
	id: z.string(),
});

export type FoodCategoryDBO = z.infer<typeof FoodCategoryDBOSchema>;

export const PlanParametersSchema = z
	.object({
		categories: z.optional(z.array(z.string())),
		types: z.optional(z.array(z.string())),
	})
	.strict();

export type PlanParameters = z.infer<typeof PlanParametersSchema>;

export const IDParameterSchema = z.object({
	id: z.string(),
});

export type IDParameter = z.infer<typeof IDParameterSchema>;

export const UserDTOSchema = z.object({
	email: z.string().email(),
	username: z.string(),
	password: z.string(),
});

export const UserDBOSchema = UserDTOSchema.extend({ id: z.string() });

export type UserDTO = z.infer<typeof UserDTOSchema>;

export type UserDBO = z.infer<typeof UserDBOSchema>;
