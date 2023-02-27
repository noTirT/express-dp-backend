"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerService = void 0;
const db_1 = __importDefault(require("../db"));
function generateQuery(params) {
    return `SELECT * FROM food ${params.categories || params.types ? "WHERE" : ""} ${params.categories ? `category IN ('${params.categories.join("', '")}')` : ""} ${params.types && params.categories ? "AND" : ""} ${params.types ? `type IN ('${params.types.join("', '")}')` : ""}`;
}
function generatePlan(params) {
    return new Promise((resolve, reject) => {
        db_1.default.all(generateQuery(params), (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        });
    });
}
exports.plannerService = {
    generatePlan,
};
