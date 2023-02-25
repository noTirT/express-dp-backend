import formidable from "formidable";
import { z } from "zod";
import { FoodDTO } from "./types";
import fs from "fs";
import { join } from "path";

export function validate<T extends z.ZodTypeAny>(data: unknown, schema: T): boolean {
	try {
		schema.parse(data);
	} catch (e) {
		return false;
	}
	return true;
}

export function isFoodDTO(data: FoodDTO[]): data is FoodDTO[] {
	return data.every(
		(item) => "name" in item && "category" in item && "type" in item && Object.keys(item).length <= 4
	);
}

export function isUUID(check: string): boolean {
	const reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return reg.test(check);
}

export function savePdf(file: formidable.File, errorCallback: () => void) {
	const fileID = crypto.randomUUID();

	const filename = encodeURIComponent(fileID + ".pdf");

	if (file.mimetype !== "application/pdf") {
		return errorCallback();
	}
	try {
		fs.renameSync(file.filepath, join(__dirname, "../../data/recipes", filename));
	} catch (err) {
		console.log(err);
	}

	return fileID;
}
