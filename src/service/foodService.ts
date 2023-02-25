import Database from "../db";
import { FoodDBO, FoodDTO } from "../types";
import crypto from "crypto";

type FoodWODescDTO = Omit<FoodDTO, "description">;
type FoodWODescDBO = Omit<FoodDBO, "description">;

function getAll() {
	return new Promise((resolve, reject) => {
		Database.all("SELECT * FROM food ORDER BY name", (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
}

function insert(data: FoodDTO | FoodWODescDTO) {
	const item: FoodDBO | FoodWODescDBO = {
		...data,
		id: crypto.randomUUID(),
	};
	return new Promise((resolve, reject) => {
		Database.run(
			"INSERT INTO food (id, name, description, type, category) VALUES (?,?,?,?,?)",
			[item.id, item.name, "description" in item ? item.description : "", item.type, item.category],
			(err) => {
				if (err) {
					reject(err);
				}
				resolve(item);
			}
		);
	});
}

function deleteById(id: string) {
	return new Promise((resolve, reject) => {
		Database.run("DELETE from food WHERE id = ?", [id], (err) => {
			if (err) {
				reject(err);
			}
			resolve(null);
		});
	});
}

function getById(id: string) {
	return new Promise((resolve, reject) => {
		Database.all("SELECT * FROM food WHERE id = ?", [id], (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows as FoodDBO[]);
		});
	});
}

function updateById(id: string, body: Omit<FoodDTO, "description">) {
	return new Promise((resolve, reject) => {
		Database.run(
			"UPDATE food SET name=?, type=?, category=? WHERE id=?",
			[body.name, body.type, body.category, id],
			(err) => {
				if (err) {
					reject(err);
				}
				resolve(null);
			}
		);
	});
}

export const foodService = {
	insert,
	deleteById,
	getAll,
	updateById,
	getById,
};
