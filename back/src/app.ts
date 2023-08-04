import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "./middlewares/handleAppError.middleware";
import { userRoutes } from "./routes/user.routes";
import { sessionRoute } from "./routes/session.routes";
import { contactRoutes } from "./routes/contact.routes";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors(/* {
    origin: "http://127.0.0.1:5173",
  } */)
);
app.use("/user", userRoutes);
app.use("/login", sessionRoute);
app.use("/contact", contactRoutes);

app.use(handleAppError);

export default app;
