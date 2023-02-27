import dotenv from "dotenv";
import express, { Express } from "express";
import cookieParser from "cookie-parser";

import FoodRouter from "./routes/food";
import DietTypeRouter from "./routes/diettypes";
import FoodCategoryRouter from "./routes/foodcategory";
import PlannerRouter from "./routes/mealplan";
import AuthRouter from "./routes/auth";

import swaggerUi from "swagger-ui-express";
const swaggerJson = require("../data/swagger.json");

import cors from "cors";
import path from "path";

import { requireAuth } from "./util";

import { authService } from "./service/authService";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
	const authToken = req.headers["authtoken"];

	//@ts-ignore
	req.user = await authService.getUserByToken(authToken);

	next();
});

app.use("/static", express.static(path.join(__dirname, "../data/recipes")));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use("/food", requireAuth, FoodRouter);
app.use("/diettype", requireAuth, DietTypeRouter);
app.use("/foodcategory", requireAuth, FoodCategoryRouter);
app.use("/planner", requireAuth, PlannerRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
	console.log("Server is running at port " + port);
});
