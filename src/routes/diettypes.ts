import express, { Request, Response } from "express";
import { diettypeService as service } from "../db/diettypesSerivce";
import { DietTypeDBO, DietTypeDTO } from "../types";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	service.getAll(
		(err: Error) => res.json({ message: "failed", error: err }),
		(data: DietTypeDBO[]) => res.json({ message: "success", data })
	);
});

router.post("/", (req: Request, res: Response) => {
	const item: DietTypeDTO = req.body;
	service.insert(
		item,
		(err: Error) => res.json({ message: "failed", error: err }),
		(data: DietTypeDBO) => res.json({ message: "success", data })
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
