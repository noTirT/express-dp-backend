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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerJson = require("../data/swagger.json");
/* import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCnWpxm4OYE0D3GBre9Qiurb34SibdUwgo",
    authDomain: "dietplanner-backend.firebaseapp.com",
    projectId: "dietplanner-backend",
    storageBucket: "dietplanner-backend.appspot.com",
    messagingSenderId: "206600349106",
    appId: "1:206600349106:web:5c243452af5950ee6370ab",
    measurementId: "G-B1GJ09KHFG",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = initializeAnalytics(firebaseApp);
 */
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJson));
app.use("/food", food_1.default);
app.use("/diettype", diettypes_1.default);
app.use("/foodcategory", foodcategory_1.default);
app.listen(port, () => {
    console.log("Server is running at https://localhost:" + port);
});
