import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import usersRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "..", "client/build");

app.use(express.static(publicPath));

app.use(express.json());

app.use("/api", usersRoutes);
app.use("/api", loginRoutes);
app.use("/api/jobs", jobRoutes); // Use job routes

app.get("/*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express listening on port ${process.env.EXPRESS_PORT}`);
});
