import Database from "../db";
import crypto from "crypto";
import { FoodCategoryDBO, FoodCategoryDTO } from "../types";

const getAll = (errorCallback: (err: Error) => void, successCallback: (data: FoodCategoryDBO[]) => void) => {
	Database.all("SELECT * FROM foodcategory", (err, rows) => {
		if (err) {
			errorCallback(err);
			return console.log(err);
		}
		successCallback(rows);
	});
};

const insert = (
	data: FoodCategoryDTO,
	errorCallback: (err: Error) => void,
	successCallback: (data: FoodCategoryDBO) => void
) => {
	const item: FoodCategoryDBO = { ...data, id: crypto.randomUUID() };
	Database.run("INSERT INTO foodcategory (id, name) VALUES (?, ?)", [item.id, item.name], (err) => {
		if (err) {
			errorCallback(err);
			return console.log(err);
		}
		successCallback(item);
	});
};

const deleteById = (id: string, errorCallback: (err: Error) => void, successCallback: () => void) => {
	Database.run("DELETE FROM foodcategory WHERE id = ?", [id], (err) => {
		if (err) {
			errorCallback(err);
			return console.log(err);
		}
		successCallback();
	});
};

export const foodcategoryService = {
	insert,
	getAll,
	deleteById,
};
