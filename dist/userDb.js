"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database("./data/userDatabase.db", sqlite3_1.default.OPEN_READWRITE, (err) => {
    if (err) {
        if (err.message.includes("SQLITE_CANTOPEN")) {
            createDatabase();
            return;
        }
        else {
            console.log("Getting error on user database: " + err);
            (0, process_1.exit)(1);
        }
    }
});
function createDatabase() {
    var newDb = new sqlite3_1.default.Database("./data/userDatabase.db", (err) => {
        if (err) {
            console.log("Getting error on user database creation: " + err);
            (0, process_1.exit)(1);
        }
        createTables(newDb);
    });
}
function createTables(db) {
    const dataSQL = (0, fs_1.readFileSync)(path_1.default.join(__dirname, "../src/userDb_init.sql")).toString();
    const sqlArray = dataSQL.toString().split(");");
    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        sqlArray.forEach((query) => {
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
}
exports.default = db;
