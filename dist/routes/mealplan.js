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
const plannerService_1 = require("../service/plannerService");
const types_1 = require("../types");
const util_1 = require("../util");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, util_1.validate)(req.body, types_1.PlanParametersSchema))
        return res.status(400).json({ message: "error", error: "Wrong request body" });
    try {
        //@ts-ignore
        const data = yield plannerService_1.plannerService.generatePlan(req.body);
        if (data.length <= 7)
            return res.status(200).json({ message: "success", data });
        const resultSet = [];
        var i;
        for (i = 0; i < 7; i++) {
            const index = Math.floor(Math.random() * data.length);
            resultSet.push(data.at(index));
            data.splice(index, 1);
        }
        return res.status(200).json({ message: "success", data: resultSet });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error", error });
    }
}));
exports.default = router;
