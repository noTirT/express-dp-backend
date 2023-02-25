"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodService = void 0;
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
function getAll() {
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT * FROM food ORDER BY name", (err, rows) => {
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
        db_1.default.run("INSERT INTO food (id, name, description, type, category) VALUES (?,?,?,?,?)", [item.id, item.name, "description" in item ? item.description : "", item.type, item.category], (err) => {
            if (err) {
                reject(err);
            }
            resolve(item);
        });
    });
}
function deleteById(id) {
    return new Promise((resolve, reject) => {
        db_1.default.run("DELETE from food WHERE id = ?", [id], (err) => {
            if (err) {
                reject(err);
            }
            resolve(null);
        });
    });
}
function getById(id) {
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT * FROM food WHERE id = ?", [id], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}
function updateById(id, body) {
    return new Promise((resolve, reject) => {
        db_1.default.run("UPDATE food SET name=?, type=?, category=? WHERE id=?", [body.name, body.type, body.category, id], (err) => {
            if (err) {
                reject(err);
            }
            resolve(null);
        });
    });
}
exports.foodService = {
    insert,
    deleteById,
    getAll,
    updateById,
    getById,
};
