"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diettypesSerivce_1 = require("../db/diettypesSerivce");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    diettypesSerivce_1.diettypeService.getAll((err) => res.json({ message: "failed", error: err }), (data) => res.json({ message: "success", data }));
});
router.post("/", (req, res) => {
    const item = req.body;
    diettypesSerivce_1.diettypeService.insert(item, (err) => res.json({ message: "failed", error: err }), (data) => res.json({ message: "success", data }));
});
router.delete("/:itemId", (req, res) => {
    diettypesSerivce_1.diettypeService.deleteById(req.params.itemId, (err) => res.json({ message: "failed", error: err }), () => res.json({ message: "success" }));
});
exports.default = router;
