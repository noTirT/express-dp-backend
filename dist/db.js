"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database("./data/database.db", sqlite3_1.default.OPEN_READWRITE, (err) => {
    if (err && err.message.includes("SQLITE_CANTOPEN")) {
        createDatabase();
        return;
    }
    else if (err) {
        console.log("Getting error: " + err);
        (0, process_1.exit)(1);
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
    var newDb = new sqlite3_1.default.Database("./data/database.db", (err) => {
        if (err) {
            console.log("Getting error: " + err);
            (0, process_1.exit)(1);
        }
        createTables(newDb);
    });
};
const createTables = (newDb) => {
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
            diettype text,
            foodcategory text,
            primary key (id),
            constraint FK_foodcategory foreign key (foodcategory) references foodcategory(id),
            constraint FK_diettype foreign key (diettype) references diettype(id)
        );
    `);
};
exports.default = db;
