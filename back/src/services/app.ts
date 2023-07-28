import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "../middlewares/handleAppError.middleware";
/* import { userRoutes } from "./routes/users.routes"
import { sessionRoutes } from "./routes/session.routes"
import { tasksRoutes } from "./routes/tasks.routes"
 */
const app = express();

app.use(express.json());
/* app.use("/users", userRoutes)
app.use("/login", sessionRoutes)
app.use("/tasks", tasksRoutes) */
app.use(handleAppError);

export default app;
