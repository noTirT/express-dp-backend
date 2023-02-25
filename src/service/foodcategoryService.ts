import Database from "../db";
import crypto from "crypto";
import { FoodCategoryDBO, FoodCategoryDTO } from "../types";

function getAll() {
	return new Promise((resolve, reject) => {
		Database.all("SELECT * FROM foodcategory", (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
}

function insert(data: FoodCategoryDTO) {
	const item: FoodCategoryDBO = { ...data, id: crypto.randomUUID() };
	return new Promise((resolve, reject) => {
		Database.run("INSERT INTO foodcategory (id, name) VALUES (?, ?)", [item.id, item.name], (err) => {
			if (err) {
				reject(err);
			}
			resolve(item);
		});
	});
}

function deleteById(id: string) {
	return new Promise((resolve, reject) => {
		Database.run("DELETE FROM foodcategory WHERE id = ?", [id], (err) => {
			if (err) {
				reject(err);
			}
			resolve(null);
		});
	});
}

export const foodcategoryService = {
	insert,
	getAll,
	deleteById,
};
