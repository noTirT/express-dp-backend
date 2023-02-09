"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodcategoryService = void 0;
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
const getAll = (errorCallback, successCallback) => {
    db_1.default.all("SELECT * FROM foodcategory", (err, rows) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        successCallback(rows);
    });
};
const insert = (data, errorCallback, successCallback) => {
    const item = Object.assign(Object.assign({}, data), { id: crypto_1.default.randomUUID() });
    db_1.default.run("INSERT INTO foodcategory (id, name) VALUES (?, ?)", [item.id, item.name], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        successCallback(item);
    });
};
const deleteById = (id, errorCallback, successCallback) => {
    db_1.default.run("DELETE FROM foodcategory WHERE id = ?", [id], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        successCallback();
    });
};
exports.foodcategoryService = {
    insert,
    getAll,
    deleteById,
};
