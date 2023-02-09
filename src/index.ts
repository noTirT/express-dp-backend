import dotenv from "dotenv";
import express, { Express } from "express";
import FoodRouter from "./routes/food";
import DietTypeRouter from "./routes/diettypes";
import FoodCategoryRouter from "./routes/foodcategory";
import swaggerUi from "swagger-ui-express";
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
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/food", FoodRouter);
app.use("/diettype", DietTypeRouter);
app.use("/foodcategory", FoodCategoryRouter);

app.listen(port, () => {
	console.log("Server is running at https://localhost:" + port);
});
