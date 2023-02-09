"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodcategoryService_1 = require("../db/foodcategoryService");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    foodcategoryService_1.foodcategoryService.getAll((err) => res.json({ message: "failed", error: err }), (data) => res.json({ message: "success", data }));
});
router.post("/", (req, res) => {
    const item = req.body;
    foodcategoryService_1.foodcategoryService.insert(item, (err) => res.json({ message: "failed", error: err }), (data) => res.json({ message: "success", data }));
});
router.delete("/:itemId", (req, res) => {
    foodcategoryService_1.foodcategoryService.deleteById(req.params.itemId, (err) => res.json({ message: "failed", error: err }), () => res.json({ message: "success" }));
});
exports.default = router;
