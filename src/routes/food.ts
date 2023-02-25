import express, { Request, Response } from "express";
import formidable from "formidable";
import multer from "multer";
import path from "path";
import { foodService as service } from "../service/foodService";
import { FoodDBO, FoodDTO, FoodDTOSchema, IDParameter, IDParameterSchema } from "../types";
import { isFoodDTO, isUUID, savePdf, validate } from "../util";

const router = express.Router();

const storage: multer.StorageEngine = multer.diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb) {
		cb(null, path.join(__dirname, "../../data/recipes"));
	},
	filename: function (req: Request, file: Express.Multer.File, cb) {
		cb(null, file.originalname + path.extname(file.originalname));
	},
});

router.get("/", async (req: Request, res: Response) => {
	try {
		const data = await service.getAll();
		return res.status(200).json({ message: "success", data });
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
});

router.post("/", async (req: Request<{}, {}, Omit<FoodDTO, "description">>, res: Response) => {
	const data: Omit<FoodDTO, "description"> = req.body;
	if (!validate(req.body, FoodDTOSchema.omit({ description: true })))
		return res.status(400).json({ message: "error", error: "Wrong Request Body" });

	try {
		const data = await service.insert(req.body);
		return res.status(200).json({ message: "success", data });
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
});

router.delete("/:id", async (req: Request<IDParameter>, res: Response) => {
	if (!validate(req.params, IDParameterSchema))
		return res.status(400).json({ message: "error", error: "Wrong Request Parameters" });

	try {
		const data = await service.deleteById(req.params.id);
		return res.status(200).json({ message: "success", data });
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
});

router.put("/:foodId", async (req: Request<IDParameter, {}, Omit<FoodDTO, "description">>, res: Response) => {
	if (!validate(req.body, FoodDTOSchema.omit({ description: true })))
		return res.status(400).json({ message: "error", error: "Wrong Request Body" });

	if (!validate(req.params, IDParameterSchema))
		return res.status(400).json({ message: "error", error: "Wrong Request Parameters" });

	try {
		const data = await service.updateById(req.params.id, req.body);
		return res.status(200).json({ message: "success", data });
	} catch (error) {
		return res.status(500).json({ message: "error", error });
	}
});

router.put("/recipe/:foodId", async (req: Request, res: Response) => {
	const form = formidable({ uploadDir: path.join(__dirname, "../../data/recipes") });

	form.parse(req, async (err, fields: formidable.Fields, files: formidable.Files) => {
		if (err) {
			res.status(500).json({ message: "error", error: err });
		}

		try {
			//@ts-ignore
			const data: FoodDBO[] = await service.getById(req.params.id);

			if (data.length === 0) {
				return res.status(404).json({ message: "No item with the given ID found" });
			}

			const originalData: FoodDBO = data[0];

			if (!originalData.description || !isUUID(originalData.description)) {
				return res.status(200).json({ message: "success", data });
			}
			throw new Error("No Recipe attached");
		} catch (error) {
			return res.status(500).json({ message: "error", error });
		}
	});
});

router.post("/multiple", async (req: Request, res: Response) => {
	const data: FoodDTO[] = req.body;
	if (isFoodDTO(data)) {
		for (const item of data) {
			try {
				await service.insert(item);
			} catch (error) {
				return res.status(500).json({ message: "error", error });
			}
		}
		res.json({ message: "success" });
	} else {
		res.json({ message: "error", error: "Wrong csv header" });
	}
});

router.post("/recipe", async (req: Request, res: Response) => {
	const form = formidable({ uploadDir: path.join(__dirname, "../../data/recipes") });

	form.parse(req, async (err, fields: formidable.Fields, files: formidable.Files) => {
		if (err) {
			res.json({ message: "error", error: err });
		}

		if (!files.length) {
			//@ts-ignore
			const fileId = savePdf(files.file, () => res.status(500).json({ message: "Error", err: "Wrong filetype" }));

			//@ts-ignore
			const newFood = JSON.parse(fields.data);

			try {
				const data = await service.insert({ ...newFood, description: fileId });
				return res.status(200).json({ message: "success", data });
			} catch (error) {
				return res.status(500).json({ message: "error", error });
			}
		}
	});
});

export default router;
