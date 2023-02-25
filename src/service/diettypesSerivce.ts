import Database from "../db";
import crypto from "crypto";
import { DietTypeDBO, DietTypeDTO } from "../types";

function getAll() {
	return new Promise((resolve, reject) => {
		Database.all("SELECT * FROM diettype ORDER BY id", (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
}

function insert(dietType: DietTypeDTO) {
	const item: DietTypeDBO = { ...dietType, id: crypto.randomUUID() };
	return new Promise((resolve, reject) => {
		Database.run("INSERT INTO diettype (id, name) VALUES (?,?)", [item.id, item.name], (err) => {
			if (err) {
				reject(err);
			}
			resolve(item);
		});
	});
}

function deleteById(id: string) {
	return new Promise((resolve, reject) => {
		Database.run("DELETE FROM diettype WHERE id = ?", [id], (err) => {
			if (err) {
				reject(err);
			}
			resolve(null);
		});
	});
}

export const diettypeService = {
	getAll,
	insert,
	deleteById,
};
