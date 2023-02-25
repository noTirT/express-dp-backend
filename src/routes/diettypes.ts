import express, { Request, Response } from "express";
import { diettypeService as service } from "../service/diettypesSerivce";
import { DietTypeDTO, DietTypeDTOSchema, IDParameter, IDParameterSchema } from "../types";
import { validate } from "../util";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		const data = await service.getAll();
		return res.status(200).json({ message: "success", data });
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
});

router.post("/", async (req: Request<{}, {}, DietTypeDTO>, res: Response) => {
	if (!validate(req.body, DietTypeDTOSchema))
		return res.json(400).json({ message: "error", error: "Wrong Request Body" });

	try {
		const data = await service.insert(req.body);
		return res.status(200).json({ message: "success", data });
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
});

router.delete("/:id", async (req: Request<IDParameter>, res: Response) => {
	if (!validate(req.params, IDParameterSchema))
		return res.status(400).json({ message: "error", error: "Wrong Request Parameter" });

	try {
		const data = await service.deleteById(req.params.id);
		return res.status(200).json({ message: "success", data });
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
});

export default router;
