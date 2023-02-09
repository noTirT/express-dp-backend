import Database from "../db";
import crypto from "crypto";
import { DietTypeDBO, DietTypeDTO } from "../types";

const getAll = (errorCallback: (err: Error) => void, successCallback: (data: DietTypeDBO[]) => void) => {
	Database.all("SELECT * FROM diettype ORDER BY id", (err, rows) => {
		if (err) {
			errorCallback(err);
			return console.log(err);
		}
		successCallback(rows);
	});
};

const insert = (
	dietType: DietTypeDTO,
	errorCallback: (err: Error) => void,
	successCallback: (data: DietTypeDBO) => void
) => {
	const item: DietTypeDBO = { ...dietType, id: crypto.randomUUID() };
	Database.run("INSERT INTO diettype (id, name) VALUES (?,?)", [item.id, item.name], (err) => {
		if (err) {
			errorCallback(err);
			return console.log(err);
		}
		successCallback(item);
	});
};

const deleteById = (id: string, errorCallback: (err: Error) => void, successCallback: () => void) => {
	Database.run("DELETE FROM diettype WHERE id = ?", [id], (err) => {
		if (err) {
			errorCallback(err);
			console.log(err);
		}
		successCallback();
	});
};

export const diettypeService = {
	getAll,
	insert,
	deleteById,
};
