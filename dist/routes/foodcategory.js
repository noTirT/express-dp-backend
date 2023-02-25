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
const foodcategoryService_1 = require("../service/foodcategoryService");
const types_1 = require("../types");
const util_1 = require("../util");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield foodcategoryService_1.foodcategoryService.getAll();
        return res.status(200).json({ message: "success", data });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, util_1.validate)(req.body, types_1.FoodCategoryDTOSchema))
        return res.status(400).json({ message: "error", error: "Wrong Request Body" });
    try {
        const data = yield foodcategoryService_1.foodcategoryService.insert(req.body);
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
        const data = yield foodcategoryService_1.foodcategoryService.deleteById(req.params.id);
        return res.status(200).json({ message: "success", data });
    }
    catch (error) {
        return res.status(500).json({ message: "error", error });
    }
}));
exports.default = router;
