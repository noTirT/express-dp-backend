"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const food_1 = __importDefault(require("./routes/food"));
const diettypes_1 = __importDefault(require("./routes/diettypes"));
const foodcategory_1 = __importDefault(require("./routes/foodcategory"));
const mealplan_1 = __importDefault(require("./routes/mealplan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerJson = require("../data/swagger.json");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "../data/recipes")));
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJson));
app.use("/food", food_1.default);
app.use("/diettype", diettypes_1.default);
app.use("/foodcategory", foodcategory_1.default);
app.use("/planner", mealplan_1.default);
app.listen(port, () => {
    console.log("Server is running at https://localhost:" + port);
});
