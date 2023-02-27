"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.generateAuthToken = exports.getHashedPassword = exports.savePdf = exports.isUUID = exports.isFoodDTO = exports.validate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const crypto_1 = __importDefault(require("crypto"));
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
    const fileID = crypto_1.default.randomUUID();
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
function getHashedPassword(password) {
    const sha256 = crypto_1.default.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
}
exports.getHashedPassword = getHashedPassword;
function generateAuthToken() {
    return crypto_1.default.randomBytes(30).toString("hex");
}
exports.generateAuthToken = generateAuthToken;
function requireAuth(req, res, next) {
    //@ts-ignore
    if (req.user) {
        next();
    }
    else {
        return res.status(401).json({ message: "error", erro: "Unauthorized" });
    }
}
exports.requireAuth = requireAuth;
