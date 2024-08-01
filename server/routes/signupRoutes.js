import Router from "express";

import pool from "../util/database.js";

const router = Router();

router.post("/", async (req, res) => {
    const { username, password, first_name, last_name } = req.body;
    const sql = `
        INSERT INTO user (
            first_name,
            last_name,
            username,
            password
        )
        VALUES (?, ?, ?, ?)
    `;
    try {
        await pool.query(
            sql,
            [first_name, last_name, username, password]
        )
        res.json({message: "Account successfully created"});
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;