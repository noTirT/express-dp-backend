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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const food_1 = __importDefault(require("./routes/food"));
const diettypes_1 = __importDefault(require("./routes/diettypes"));
const foodcategory_1 = __importDefault(require("./routes/foodcategory"));
const mealplan_1 = __importDefault(require("./routes/mealplan"));
const auth_1 = __importDefault(require("./routes/auth"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerJson = require("../data/swagger.json");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
const authService_1 = require("./service/authService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers["authtoken"];
    //@ts-ignore
    req.user = yield authService_1.authService.getUserByToken(authToken);
    next();
}));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../data/recipes")));
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJson));
app.use("/food", util_1.requireAuth, food_1.default);
app.use("/diettype", util_1.requireAuth, diettypes_1.default);
app.use("/foodcategory", util_1.requireAuth, foodcategory_1.default);
app.use("/planner", util_1.requireAuth, mealplan_1.default);
app.use("/auth", auth_1.default);
app.listen(port, () => {
    console.log("Server is running at port " + port);
});
