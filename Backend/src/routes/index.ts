import express from "express";
import userRoutes from "./userRoutes";
import addressRoutes from "./addressRoutes";

const appRouter = express();

appRouter.use("/users", userRoutes);
appRouter.use("/address", addressRoutes);

export default appRouter;
