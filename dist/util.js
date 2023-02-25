"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePdf = exports.isUUID = exports.isFoodDTO = exports.validate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
function validate(data, schema) {
    try {
        schema.parse(data);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.validate = validate;
function isFoodDTO(data) {
    return data.every((item) => "name" in item && "category" in item && "type" in item && Object.keys(item).length <= 4);
}
exports.isFoodDTO = isFoodDTO;
function isUUID(check) {
    const reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return reg.test(check);
}
exports.isUUID = isUUID;
function savePdf(file, errorCallback) {
    const fileID = crypto.randomUUID();
    const filename = encodeURIComponent(fileID + ".pdf");
    if (file.mimetype !== "application/pdf") {
        return errorCallback();
    }
    try {
        fs_1.default.renameSync(file.filepath, (0, path_1.join)(__dirname, "../../data/recipes", filename));
    }
    catch (err) {
        console.log(err);
    }
    return fileID;
}
exports.savePdf = savePdf;
