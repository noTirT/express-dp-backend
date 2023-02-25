"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDParameterSchema = exports.PlanParametersSchema = exports.FoodCategoryDBOSchema = exports.FoodCategoryDTOSchema = exports.DietTypeDBOSchema = exports.DietTypeDTOSchema = exports.FoodDBOSchema = exports.FoodDTOSchema = void 0;
const zod_1 = require("zod");
exports.FoodDTOSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    description: zod_1.z.optional(zod_1.z.string()),
    type: zod_1.z.string(),
    category: zod_1.z.string(),
})
    .strict();
exports.FoodDBOSchema = exports.FoodDTOSchema.extend({
    id: zod_1.z.string(),
});
exports.DietTypeDTOSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
})
    .strict();
exports.DietTypeDBOSchema = exports.DietTypeDTOSchema.extend({
    id: zod_1.z.string(),
});
exports.FoodCategoryDTOSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
})
    .strict();
exports.FoodCategoryDBOSchema = exports.FoodCategoryDTOSchema.extend({
    id: zod_1.z.string(),
});
exports.PlanParametersSchema = zod_1.z
    .object({
    categories: zod_1.z.optional(zod_1.z.array(zod_1.z.string())),
    types: zod_1.z.optional(zod_1.z.array(zod_1.z.string())),
})
    .strict();
exports.IDParameterSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
