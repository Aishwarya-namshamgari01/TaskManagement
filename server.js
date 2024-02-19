import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { AuthRouter } from "./routes/authRoutes.js";
import { CategoryRouter } from "./routes/categoryRoutes.js";
import { TaskRouter } from "./routes/taskRoutes.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();
connectDB();
app.use(AuthRouter);
app.use(CategoryRouter);
app.use(TaskRouter);

dotenv.config();
app.timeout = 0;
app.listen(3000, () => {
  console.log("listening");
});
