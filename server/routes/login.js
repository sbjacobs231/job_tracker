import Router from "express";

import pool from "../util/database.js";

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
        res.json({
            "id": results[0].id,
            "username": results[0].username,
        }) 
    } catch (error) {
        console.log(error);
        res.json({"error": "Invalid credentials"});
    }
});

export default router;
