import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";
import jobRoutes from "./routes/jobRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import metricRoutes from "./routes/metrics.js";

dotenv.config();

const app = express();
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "..", "client/build");

app.use(express.static(publicPath));

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api", metricRoutes);

app.get("/*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express listening on port ${process.env.EXPRESS_PORT}`);
});
