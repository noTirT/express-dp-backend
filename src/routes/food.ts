import express, { Request, Response } from "express";
import { foodService as service } from "../db/foodService";
import { FoodDBO, FoodDTO } from "../types";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	service.getAll(
		(data: FoodDBO[]) =>
			res.json({
				message: "success",
				data,
			}),
		(err: Error) => res.json({ message: "failed", error: err.message })
	);
});

router.post("/", (req: Request, res: Response) => {
	const data: FoodDTO = req.body;
	service.insert(
		data,
		(err: Error) => res.json({ message: "failed", error: err.message }),
		(created: FoodDBO) => res.json({ message: "success", created: created })
	);
});

router.delete("/:foodId", (req: Request, res: Response) => {
	service.deleteById(
		req.params.foodId,
		(err: Error) => res.json({ message: "failed", error: err.message }),
		() => res.json({ message: "success" })
	);
});

export default router;
