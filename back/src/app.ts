import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "./middlewares/handleAppError.middleware";
import { userRoutes } from "./routes/user.routes";
import { sessionRoute } from "./routes/session.routes";

const app = express();

app.use(express.json());
app.use("/user", userRoutes);
app.use("/login", sessionRoute);
/* app.use("/tasks", tasksRoutes)
 */
app.use(handleAppError);

export default app;
