"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formidable_1 = __importDefault(require("formidable"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const foodService_1 = require("../service/foodService");
const types_1 = require("../types");
const util_1 = require("../util");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../data/recipes"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + path_1.default.extname(file.originalname));
    },
});
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield foodService_1.foodService.getAll();
        return res.status(200).json({ message: "success", data });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!(0, util_1.validate)(req.body, types_1.FoodDTOSchema.omit({ description: true })))
        return res.status(400).json({ message: "error", error: "Wrong Request Body" });
    try {
        const data = yield foodService_1.foodService.insert(req.body);
        return res.status(200).json({ message: "success", data });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, util_1.validate)(req.params, types_1.IDParameterSchema))
        return res.status(400).json({ message: "error", error: "Wrong Request Parameters" });
    try {
        const data = yield foodService_1.foodService.deleteById(req.params.id);
        return res.status(200).json({ message: "success", data });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
}));
router.put("/:foodId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, util_1.validate)(req.body, types_1.FoodDTOSchema.omit({ description: true })))
        return res.status(400).json({ message: "error", error: "Wrong Request Body" });
    if (!(0, util_1.validate)(req.params, types_1.IDParameterSchema))
        return res.status(400).json({ message: "error", error: "Wrong Request Parameters" });
    try {
        const data = yield foodService_1.foodService.updateById(req.params.id, req.body);
        return res.status(200).json({ message: "success", data });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
}));
router.put("/recipe/:foodId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({ uploadDir: path_1.default.join(__dirname, "../../data/recipes") });
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(500).json({ message: "error", error: err });
        }
        try {
            //@ts-ignore
            const data = yield foodService_1.foodService.getById(req.params.id);
            if (data.length === 0) {
                return res.status(404).json({ message: "No item with the given ID found" });
            }
            const originalData = data[0];
            if (!originalData.description || !(0, util_1.isUUID)(originalData.description)) {
                return res.status(200).json({ message: "success", data });
            }
            throw new Error("No Recipe attached");
        }
        catch (error) {
            return res.status(500).json({ message: "error", error });
        }
    }));
}));
router.post("/multiple", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if ((0, util_1.isFoodDTO)(data)) {
        for (const item of data) {
            try {
                yield foodService_1.foodService.insert(item);
            }
            catch (error) {
                return res.status(500).json({ message: "error", error });
            }
        }
        res.json({ message: "success" });
    }
    else {
        res.json({ message: "error", error: "Wrong csv header" });
    }
}));
router.post("/recipe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({ uploadDir: path_1.default.join(__dirname, "../../data/recipes") });
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.json({ message: "error", error: err });
        }
        if (!files.length) {
            //@ts-ignore
            const fileId = (0, util_1.savePdf)(files.file, () => res.status(500).json({ message: "Error", err: "Wrong filetype" }));
            //@ts-ignore
            const newFood = JSON.parse(fields.data);
            try {
                const data = yield foodService_1.foodService.insert(Object.assign(Object.assign({}, newFood), { description: fileId }));
                return res.status(200).json({ message: "success", data });
            }
            catch (error) {
                return res.status(500).json({ message: "error", error });
            }
        }
    }));
}));
exports.default = router;
