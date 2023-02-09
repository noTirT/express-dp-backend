"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodService = void 0;
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
const getAll = (returnCallback, errorCallback) => {
    db_1.default.all("SELECT * FROM food ORDER BY name", (err, rows) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        returnCallback(rows);
    });
};
const insert = (data, errorCallback, sucecssCallback) => {
    const item = Object.assign(Object.assign({}, data), { id: crypto_1.default.randomUUID() });
    db_1.default.run("INSERT INTO food (id, name, description, type, category) VALUES (?,?,?,?,?)", [item.id, item.name, item.description, item.type, item.category], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        console.log("New row created: " + JSON.stringify(data));
        sucecssCallback(item);
    });
};
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
const updateById = (id, body, errorCallback, successCallback) => {
    db_1.default.run("UPDATE food SET name=?, description=?, type=?, category=? WHERE id=?", [body.name, body.description, body.type, body.category, id], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        console.log("Row Updated: " + JSON.stringify(Object.assign({ id }, body)));
        successCallback();
    });
};
exports.foodService = {
    insert,
    deleteById,
    getAll,
    updateById,
};
