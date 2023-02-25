import dotenv from "dotenv";
import express, { Express } from "express";
import FoodRouter from "./routes/food";
import DietTypeRouter from "./routes/diettypes";
import FoodCategoryRouter from "./routes/foodcategory";
import PlannerRouter from "./routes/mealplan";
import swaggerUi from "swagger-ui-express";
const swaggerJson = require("../data/swagger.json");
import cors from "cors";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "../data/recipes")));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/food", FoodRouter);
app.use("/diettype", DietTypeRouter);
app.use("/foodcategory", FoodCategoryRouter);
app.use("/planner", PlannerRouter);

app.listen(port, () => {
	console.log("Server is running at https://localhost:" + port);
});
