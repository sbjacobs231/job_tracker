import Router from "express";

import pool from "../util/database.js";
import { generateToken, authenticateToken } from "../util/token.js";

const router = Router();

router.post("/login", async (req, res) => {
    const sql = `
        SELECT
            id,
            username
        FROM
            user
        WHERE
            username = ?
            AND password = ?
    `;
    try {
        const [results, fields] = await pool.query(
            sql,
            [
                req.body.username,
                req.body.password,
            ],
        );
        const id = results[0].id;
        const token = generateToken(id);
        res.json({"token": token});
    } catch (error) {
        console.log(error);
        res.json({"error": "Invalid credentials"});
    }
});

router.post("/token/decrypt", authenticateToken, async (req, res) => {
    try {
        console.log(req.user);
        res.json({"user": req.user});
    } catch (error) {
        console.log(error);
        res.json({"error": error});
    }
});

export default router;
