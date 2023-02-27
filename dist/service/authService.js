"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const userDb_1 = __importDefault(require("../userDb"));
const crypto_1 = __importDefault(require("crypto"));
function getAllUsers() {
    return new Promise((resolve, reject) => {
        userDb_1.default.all("SELECT * FROM user", (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
}
function createUser(user) {
    const item = Object.assign(Object.assign({}, user), { id: crypto_1.default.randomUUID() });
    return new Promise((resolve, reject) => {
        userDb_1.default.run("INSERT INTO user (id, email, username, password) values (?,?,?,?)", [item.id, item.email, item.username, item.password], (err) => {
            if (err)
                reject(err);
            resolve(item);
        });
    });
}
function insertToken(token, userId) {
    return new Promise((resolve, reject) => {
        userDb_1.default.run("INSERT INTO token (token, userId) values (?,?)", [token, userId], (err) => {
            if (err)
                reject(err);
            resolve({ token, userId });
        });
    });
}
function deleteToken(token) {
    return new Promise((resolve, reject) => {
        userDb_1.default.run("DELETE FROM token WHERE token=?", [token], (err) => {
            if (err)
                reject(err);
            resolve(null);
        });
    });
}
function findUserByUsernameOrEmailAndPassword(username, password) {
    return new Promise((resolve, reject) => {
        userDb_1.default.all("SELECT * FROM user WHERE (username=? OR email=?) AND password=?", [username, username, password], (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
}
function getUserByToken(token) {
    return new Promise((resolve, reject) => {
        userDb_1.default.all("SELECT * FROM token WHERE token=?", [token], (err, rows) => {
            if (err)
                reject(err);
            resolve(rows[0]);
        });
    });
}
exports.authService = {
    getAllUsers,
    createUser,
    findUserByUsernameOrEmailAndPassword,
    insertToken,
    deleteToken,
    getUserByToken,
};
