"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodcategoryService = void 0;
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
function getAll() {
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT * FROM foodcategory", (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}
function insert(data) {
    const item = Object.assign(Object.assign({}, data), { id: crypto_1.default.randomUUID() });
    return new Promise((resolve, reject) => {
        db_1.default.run("INSERT INTO foodcategory (id, name) VALUES (?, ?)", [item.id, item.name], (err) => {
            if (err) {
                reject(err);
            }
            resolve(item);
        });
    });
}
function deleteById(id) {
    return new Promise((resolve, reject) => {
        db_1.default.run("DELETE FROM foodcategory WHERE id = ?", [id], (err) => {
            if (err) {
                reject(err);
            }
            resolve(null);
        });
    });
}
exports.foodcategoryService = {
    insert,
    getAll,
    deleteById,
};
