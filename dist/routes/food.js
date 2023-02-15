"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const express_1 = __importDefault(require("express"));
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importStar(require("path"));
const foodService_1 = require("../db/foodService");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../data/recipes"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + path_1.default.extname(file.originalname));
    },
});
router.get("/test", (req, res) => {
    res.json({ message: "success", data: "test good" });
});
router.get("/", (req, res) => {
    foodService_1.foodService.getAll((data) => res.json({
        message: "success",
        data,
    }), (err) => res.json({ message: "failed", error: err.message }));
});
router.post("/", (req, res) => {
    const data = req.body;
    foodService_1.foodService.insert(data, (err) => res.json({ message: "failed", error: err.message }), (created) => res.json({ message: "success", created: created }));
});
router.delete("/:foodId", (req, res) => {
    foodService_1.foodService.deleteById(req.params.foodId, (err) => res.json({ message: "failed", error: err.message }), () => res.json({ message: "success" }));
});
router.put("/:foodId", (req, res) => {
    const data = req.body;
    foodService_1.foodService.updateById(req.params.foodId, data, (err) => res.json({ message: "error", error: err.message }), () => res.json({ message: "success" }));
});
router.post("/multiple", (req, res) => {
    const data = req.body;
    if (isFoodDTO(data)) {
        for (const item of data) {
            foodService_1.foodService.insert(item, (err) => {
                res.json({ message: "error", error: err.message });
                return;
            }, () => { });
        }
        res.json({ message: "success" });
    }
    else {
        res.json({ message: "error", error: "Wrong csv header" });
    }
});
router.post("/recipe", (req, res) => {
    const form = (0, formidable_1.default)({ uploadDir: path_1.default.join(__dirname, "../../data/recipes") });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({ message: "error", error: err });
        }
        console.log(fields);
        if (!files.length) {
            const file = files.file;
            const fileId = crypto_1.default.randomUUID();
            const filename = encodeURIComponent(fileId + ".pdf");
            if (file.mimetype !== "application/pdf") {
                res.status(400).json({ message: "error", error: "Wrong filetype" });
            }
            try {
                fs_1.default.renameSync(file.filepath, (0, path_1.join)(__dirname, "../../data/recipes", filename));
            }
            catch (err) {
                console.log(err);
            }
            const newFood = JSON.parse(fields.data);
            foodService_1.foodService.insert(Object.assign(Object.assign({}, newFood), { description: fileId }), (err) => res.status(500).json({ message: "error", error: err }), (created) => res.status(200).json({ message: "success", data: created }));
        }
    });
});
function isFoodDTO(data) {
    return data.every((item) => "name" in item && "category" in item && "type" in item && Object.keys(item).length <= 4);
}
exports.default = router;
