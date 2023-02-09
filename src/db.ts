import { exit } from "process";
import sqlite3 from "sqlite3";
import fs from "fs";

const db = new sqlite3.Database("./data/database.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err && err.message.includes("SQLITE_CANTOPEN")) {
		createDatabase();
		return;
	} else if (err) {
		console.log("Getting error: " + err);
		exit(1);
	}
});
/* 
const readSql = () => {
	fs.readFile("./db_init.sql", "utf-8", (err, data) => {
		if (err) throw err;
		console.log(data);
	});
}; */

// readSql();

const createDatabase = () => {
	var newDb = new sqlite3.Database("./data/database.db", (err) => {
		if (err) {
			console.log("Getting error: " + err);
			exit(1);
		}
		createTables(newDb);
	});
};

const createTables = (newDb: sqlite3.Database) => {
	newDb.exec(`
        create table diettype (
            id text not null,
            name text not null,
            primary key (id)
        );

        insert into diettype (id, name) values ('0', 'vegan'), ('1', 'vegetarisch'), ('2', 'fleisch'), ('3', 'glutenfrei'),('4', 'laktosefrei');

        create table foodcategory (
            id text not null,
            name text not null,
            primary key (id)
        );

        insert into foodcategory (id, name) values ('0', 'vorspeise'), ('1', 'hauptspeise'), ('2', 'nachspeise'), ('3', 'salat'), ('4', 'kuchen');

        create table food (
            id text not null,
            name text not null, 
            description text,
            type text,
            category text,
            primary key (id),
            constraint FK_foodcategory foreign key (category) references foodcategory(id),
            constraint FK_diettype foreign key (type) references diettype(id)
        );
    `);
};

export default db;
