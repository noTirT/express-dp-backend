import express, { Request, Response } from "express";
import { foodcategoryService as service } from "../db/foodcategoryService";
import { FoodCategoryDBO, FoodCategoryDTO } from "../types";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	service.getAll(
		(err: Error) => res.json({ message: "failed", error: err }),
		(data: FoodCategoryDBO[]) => res.json({ message: "success", data })
	);
});

router.post("/", (req: Request, res: Response) => {
	const item: FoodCategoryDTO = req.body;
	service.insert(
		item,
		(err: Error) => res.json({ message: "failed", error: err }),
		(data: FoodCategoryDBO) => res.json({ message: "success", data })
	);
});

router.delete("/:itemId", (req: Request, res: Response) => {
	service.deleteById(
		req.params.itemId,
		(err: Error) => res.json({ message: "failed", error: err }),
		() => res.json({ message: "success" })
	);
});

export default router;
