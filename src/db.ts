import { exit } from "process";
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

const db = new sqlite3.Database("./data/database.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err && err.message.includes("SQLITE_CANTOPEN")) {
		createDatabase();
		return;
	} else if (err) {
		console.log("Gettaing error: " + err);
		exit(1);
	}
});

const createDatabase = () => {
	var newDb = new sqlite3.Database("./data/database.db", (err) => {
		if (err) {
			console.log("Getting error: " + err);
			exit(1);
		}
		createTables(newDb);
	});
};

const createTables = (db: sqlite3.Database) => {
	const dataSQL = fs.readFileSync(path.join(__dirname, "../src/db_init.sql")).toString();
	const dataArr = dataSQL.toString().split(");");

	db.serialize(() => {
		db.run("BEGIN TRANSACTION");

		dataArr.forEach((query) => {
			if (query) {
				query += ");";
				db.run(query, (err) => {
					if (err) throw err;
				});
			}
		});
		db.run("COMMIT");
	});
};

export default db;
