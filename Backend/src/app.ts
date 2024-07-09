import express from "express";
import appRouter from "./routes";
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", appRouter);

export default app;
