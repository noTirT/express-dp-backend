"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodService_1 = require("../db/foodService");
const router = express_1.default.Router();
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
exports.default = router;
