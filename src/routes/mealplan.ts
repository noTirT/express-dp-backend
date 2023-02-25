import express, { Request, Response } from "express";
import { plannerService as service } from "../service/plannerService";
import { FoodDBO, PlanParameters, PlanParametersSchema } from "../types";
import { validate } from "../util";

const router = express.Router();

router.post("/", async (req: Request<{}, {}, PlanParameters>, res: Response) => {
	if (!validate(req.body, PlanParametersSchema))
		return res.status(400).json({ message: "error", error: "Wrong request body" });

	try {
		//@ts-ignore
		const data: FoodDBO[] = await service.generatePlan(req.body);

		if (data.length <= 7) return res.status(200).json({ message: "success", data });

		const resultSet = [];
		var i;
		for (i = 0; i < 7; i++) {
			const index = Math.floor(Math.random() * data.length);
			resultSet.push(data.at(index));
			data.splice(index, 1);
		}
		return res.status(200).json({ message: "success", data: resultSet });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "error", error });
	}
});

export default router;
