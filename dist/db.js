"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database("./data/database.db", sqlite3_1.default.OPEN_READWRITE, (err) => {
    if (err && err.message.includes("SQLITE_CANTOPEN")) {
        createDatabase();
        return;
    }
    else if (err) {
        console.log("Getting error on main database: " + err);
        (0, process_1.exit)(1);
    }
});
const createDatabase = () => {
    var newDb = new sqlite3_1.default.Database("./data/database.db", (err) => {
        if (err) {
            console.log("Getting error on main database creation: " + err);
            (0, process_1.exit)(1);
        }
        createTables(newDb);
    });
};
const createTables = (db) => {
    const dataSQL = fs_1.default.readFileSync(path_1.default.join(__dirname, "../src/db_init.sql")).toString();
    const dataArr = dataSQL.toString().split(");");
    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        dataArr.forEach((query) => {
            if (query) {
                query += ");";
                db.run(query, (err) => {
                    if (err)
                        throw err;
                });
            }
        });
        db.run("COMMIT");
    });
};
exports.default = db;
