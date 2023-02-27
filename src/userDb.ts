import { readFileSync } from "fs";
import path from "path";
import { exit } from "process";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/userDatabase.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		if (err.message.includes("SQLITE_CANTOPEN")) {
			createDatabase();
			return;
		} else {
			console.log("Getting error on user database: " + err);
			exit(1);
		}
	}
});

function createDatabase() {
	var newDb = new sqlite3.Database("./data/userDatabase.db", (err) => {
		if (err) {
			console.log("Getting error on user database creation: " + err);
			exit(1);
		}
		createTables(newDb);
	});
}

function createTables(db: sqlite3.Database) {
	const dataSQL = readFileSync(path.join(__dirname, "../src/userDb_init.sql")).toString();
	const sqlArray = dataSQL.toString().split(");");

	db.serialize(() => {
		db.run("BEGIN TRANSACTION");

		sqlArray.forEach((query) => {
			if (query) {
				query += ");";
				db.run(query, (err) => {
					if (err) throw err;
				});
			}
		});
		db.run("COMMIT");
	});
}

export default db;
