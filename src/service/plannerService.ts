import { PlanParameters } from "../types";
import Database from "../db";

function generateQuery(params: PlanParameters) {
	return `SELECT * FROM food ${params.categories || params.types ? "WHERE" : ""} ${
		params.categories ? `category IN ('${params.categories.join("', '")}')` : ""
	} ${params.types && params.categories ? "AND" : ""} ${
		params.types ? `type IN ('${params.types.join("', '")}')` : ""
	}`;
}

function generatePlan(params: PlanParameters) {
	return new Promise((resolve, reject) => {
		Database.all(generateQuery(params), (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
}

export const plannerService = {
	generatePlan,
};
