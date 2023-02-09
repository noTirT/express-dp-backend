"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.insert = exports.getAll = void 0;
const db_1 = __importDefault(require("../db"));
const getAll = (returnCallback, errorCallback) => {
    db_1.default.all("SELECT * FROM food ORDER BY name", (err, rows) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        returnCallback(rows);
    });
};
exports.getAll = getAll;
const insert = (data, errorCallback, sucecssCallback) => {
    const item = Object.assign(Object.assign({}, data), { id: crypto.randomUUID() });
    db_1.default.run("INSERT INTO food (id, name, description) VALUES (?,?,?)", [item.id, item.name, item.description], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        console.log("New row created: " + JSON.stringify(data));
        sucecssCallback(item);
    });
};
exports.insert = insert;
const deleteById = (id, errorCallback, successCallback) => {
    db_1.default.run("DELETE from food WHERE id = ?", [id], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        console.log(`Item with ID ${id} deleted`);
        successCallback();
    });
};
exports.deleteById = deleteById;
