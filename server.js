import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { AuthRouter } from "./routes/authRoutes.js";
import { CategoryRouter } from "./routes/categoryRoutes.js";
import { TaskRouter } from "./routes/taskRoutes.js";
import { LabelRouter } from "./routes/labelRouter.js";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { CommonRouter } from "./routes/commonRoutes.js";
import notificationSocketConnection from "./sockets/notificationSocketConnection.js";

const app = express();
const server = createServer(app);
//socket connections
// const io = new Server(server);

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();
connectDB();
app.use(AuthRouter);
app.use(CategoryRouter);
app.use(TaskRouter);
app.use(LabelRouter);
app.use(CommonRouter);

dotenv.config();
//sockets connecion
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/socket", (req, res, next) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.use("/room", (req, res, next) => {
  res.sendFile(join(__dirname, "room.html"));
});
//Sockets
// createSocketConnection(server);
// roomSocketConnection(server);

//notification triggering sockets
notificationSocketConnection(server);

app.timeout = 0;
server.listen(3000, () => {
  console.log("listening");
});
