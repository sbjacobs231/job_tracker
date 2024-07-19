import Router from "express";

import pool from "../util/database.js";
import { authenticateToken } from "../util/token.js";

const router = Router();

router.get("/users", authenticateToken, async (req, res) => {
    const sql = `
        SELECT
            id,
            first_name,
            last_name,
            username
        FROM
            user
    `;
    try {
        const [results, fields] = await pool.query(sql);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.json({"error": error});
    }
});

router.post("/users", async (req, res) => {
    const sql = `
        INSERT INTO user (
            first_name,
            last_name,
            username,
            password
        ) VALUES (?, ?, ?, ?)
    `;
    try {
        const [results, fields] = await pool.query(
            sql,
            [
                req.body.first_name,
                req.body.last_name,
                req.body.username,
                req.body.password,
            ],
        );
        res.json({"id": results.insertId});
    } catch (error) {
        console.log(error);
        res.json({"error": error});
    }
});

router.get("/users/:id", authenticateToken, async (req, res) => {
    const sql = `
        SELECT
            id,
            first_name,
            last_name,
            username
        FROM
            user
        WHERE
            id = ?
    `;
    try {
        const [results, fields] = await pool.query(sql, [req.params.id]);
        res.json(results[0]);
    } catch (error) {
        console.log(error);
        res.json({"error": error});
    }
});

export default router;
