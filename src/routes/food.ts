import crypto from "crypto";
import express, { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";
import multer from "multer";
import path, { join } from "path";
import { foodService as service } from "../db/foodService";
import { FoodDBO, FoodDTO } from "../types";

const router = express.Router();

const storage: multer.StorageEngine = multer.diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb) {
		cb(null, path.join(__dirname, "../../data/recipes"));
	},
	filename: function (req: Request, file: Express.Multer.File, cb) {
		cb(null, file.originalname + path.extname(file.originalname));
	},
});

router.get("/test", (req: Request, res: Response) => {
	res.json({ message: "success", data: "test good" });
});

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
	const data: Omit<FoodDTO, "description"> = req.body;
	service.insert(
		data,
		(err: Error) => res.json({ message: "failed", error: err.message }),
		(created: Omit<FoodDBO, "description">) => res.json({ message: "success", created: created })
	);
});

router.delete("/:foodId", (req: Request, res: Response) => {
	service.deleteById(
		req.params.foodId,
		(err: Error) => res.json({ message: "failed", error: err.message }),
		() => res.json({ message: "success" })
	);
});

router.put("/:foodId", (req: Request, res: Response) => {
	const data: Omit<FoodDTO, "description"> = req.body;
	service.updateById(
		req.params.foodId,
		data,
		(err: Error) => res.json({ message: "error", error: err.message }),
		() => res.json({ message: "success" })
	);
});

router.post("/multiple", (req: Request, res: Response) => {
	const data: FoodDTO[] = req.body;
	if (isFoodDTO(data)) {
		for (const item of data) {
			service.insert(
				item,
				(err: Error) => {
					res.json({ message: "error", error: err.message });
					return;
				},
				() => {}
			);
		}
		res.json({ message: "success" });
	} else {
		res.json({ message: "error", error: "Wrong csv header" });
	}
});

router.post("/recipe", (req: Request, res: Response) => {
	const form = formidable({ uploadDir: path.join(__dirname, "../../data/recipes") });

	form.parse(req, (err, fields: formidable.Fields, files: formidable.Files) => {
		if (err) {
			res.json({ message: "error", error: err });
		}
		console.log(fields);

		if (!files.length) {
			//@ts-ignore
			const file: formidable.File = files.file;

			const fileId = crypto.randomUUID();

			const filename = encodeURIComponent(fileId + ".pdf");

			if (file.mimetype !== "application/pdf") {
				res.status(400).json({ message: "error", error: "Wrong filetype" });
			}
			try {
				fs.renameSync(file.filepath, join(__dirname, "../../data/recipes", filename));
			} catch (err) {
				console.log(err);
			}

			//@ts-ignore
			const newFood = JSON.parse(fields.data);

			service.insert(
				{ ...newFood, description: fileId },
				(err) => res.status(500).json({ message: "error", error: err }),
				(created: FoodDBO | Omit<FoodDBO, "description">) =>
					res.status(200).json({ message: "success", data: created })
			);
		}
	});
});

function isFoodDTO(data: FoodDTO[]): data is FoodDTO[] {
	return data.every(
		(item) => "name" in item && "category" in item && "type" in item && Object.keys(item).length <= 4
	);
}

export default router;
