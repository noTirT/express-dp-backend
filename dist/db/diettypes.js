"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiettypeById = exports.insertDiettype = exports.getAllDiettypes = void 0;
const db_1 = __importDefault(require("../db"));
const getAllDiettypes = (errorCallback, successCallback) => {
    db_1.default.all("SELECT * FROM diettype ORDER BY id", (err, rows) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        successCallback(rows);
    });
};
exports.getAllDiettypes = getAllDiettypes;
const insertDiettype = (dietType, errorCallback, successCallback) => {
    const item = Object.assign(Object.assign({}, dietType), { id: crypto.randomUUID() });
    db_1.default.run("INSERT INTO diettype (id, name) VALUES (?,?)", [item.id, item.name], (err) => {
        if (err) {
            errorCallback(err);
            return console.log(err);
        }
        successCallback(item);
    });
};
exports.insertDiettype = insertDiettype;
const deleteDiettypeById = (id, errorCallback, successCallback) => {
    db_1.default.run("DELETE FROM diettype WHERE id = ?", [id], (err) => {
        if (err) {
            errorCallback(err);
            console.log(err);
        }
        successCallback();
    });
};
exports.deleteDiettypeById = deleteDiettypeById;
