import Database from "../db";
import { FoodDBO, FoodDTO } from "../types";
import crypto from "crypto";

const getAll = (returnCallback: (data: any[]) => void, errorCallback: (err: Error) => void) => {
	Database.all("SELECT * FROM food ORDER BY name", (err, rows) => {
		if (err) {
			errorCallback(err);
			return console.log(err);
		}
		returnCallback(rows);
	});
};

const insert = (data: FoodDTO, errorCallback: (err: Error) => void, sucecssCallback: (created: FoodDBO) => void) => {
	const item: FoodDBO = {
		...data,
		id: crypto.randomUUID(),
	};
	Database.run(
		"INSERT INTO food (id, name, description, diettype, foodcategory) VALUES (?,?,?,?,?)",
		[item.id, item.name, item.description, item.type, item.category],
		(err) => {
			if (err) {
				errorCallback(err);
				return console.log(err);
			}
			console.log("New row created: " + JSON.stringify(data));
			sucecssCallback(item);
		}
	);
};

const deleteById = (id: string, errorCallback: (err: Error) => void, successCallback: () => void) => {
	Database.run("DELETE from food WHERE id = ?", [id], (err) => {
		if (err) {
			errorCallback(err);
			return console.log(err);
		}
		console.log(`Item with ID ${id} deleted`);
		successCallback();
	});
};

const updateById = (id: string, body: FoodDTO, errorCallback: (err: Error) => void, successCallback: () => void) => {
	Database.run(
		"UPDATE food SET name=?, description=?, type=?, category=? WHERE id=?",
		[body.name, body.description, body.type, body.category, id],
		(err) => {
			if (err) {
				errorCallback(err);
				return console.log(err);
			}
			console.log("Row Updated: " + JSON.stringify({ id, ...body }));
			successCallback();
		}
	);
};

export const foodService = {
	insert,
	deleteById,
	getAll,
	updateById,
};
