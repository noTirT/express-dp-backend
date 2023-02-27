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
exports.authTokens = void 0;
const express_1 = __importDefault(require("express"));
const authService_1 = require("../service/authService");
const util_1 = require("../util");
const router = express_1.default.Router();
exports.authTokens = {};
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
        //@ts-ignore
        const users = yield authService_1.authService.getAllUsers();
        if (users.find((user) => user.email === email)) {
            return res.status(409).json({ message: "error", error: "User with that email already exists" });
        }
        if (users.find((user) => user.username === username)) {
            return res.status(409).json({ message: "error", error: "User with that username already exists" });
        }
        const hashedPassword = (0, util_1.getHashedPassword)(password);
        yield authService_1.authService.createUser({ email, username, password: hashedPassword });
        return res.status(200).json({ message: "success" });
    }
    else {
        return res.status(400).json({ message: "error", error: "Passwords don't match" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = (0, util_1.getHashedPassword)(password);
    const user = yield authService_1.authService.findUserByUsernameOrEmailAndPassword(username, hashedPassword);
    if (user.length <= 0)
        return res.status(404).json({ message: "error", error: "No user with that credentials found" });
    const authToken = (0, util_1.generateAuthToken)();
    yield authService_1.authService.insertToken(authToken, user[0].id);
    res.cookie("AuthToken", authToken);
    return res.status(200).json({ message: "success", data: { authToken } });
}));
router.post("/logout", util_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authToken } = req.body;
    try {
        yield authService_1.authService.deleteToken(authToken);
        return res.status(200).json({ message: "success" });
    }
    catch (err) {
        return res.status(404).json({ message: "error", error: "Token not found" });
    }
}));
exports.default = router;
