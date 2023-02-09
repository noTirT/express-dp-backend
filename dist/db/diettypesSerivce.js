"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diettypeService = void 0;
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
const getAll = (errorCallback, successCallback) => {
    db_1.default.all("SELECT * FROM diettype ORDER BY id", (err, rows) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        successCallback(rows);
    });
};
const insert = (dietType, errorCallback, successCallback) => {
    const item = Object.assign(Object.assign({}, dietType), { id: crypto_1.default.randomUUID() });
    db_1.default.run("INSERT INTO diettype (id, name) VALUES (?,?)", [item.id, item.name], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        successCallback(item);
    });
};
const deleteById = (id, errorCallback, successCallback) => {
    db_1.default.run("DELETE FROM diettype WHERE id = ?", [id], (err) => {
        if (err) {
            errorCallback(err);
            console.log(err);
        }
        successCallback();
    });
};
exports.diettypeService = {
    getAll,
    insert,
    deleteById,
};
