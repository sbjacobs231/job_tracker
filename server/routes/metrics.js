import Router from "express";

import pool from "../util/database.js";
import { authenticateToken } from "../util/token.js";

const router = Router();

router.get("/metrics/count-per-day", authenticateToken, async (req, res) => {
    const sql = `
        SELECT
            COUNT(*) AS count,
            apply_date
        FROM
            job
        GROUP BY
            apply_date
        ORDER BY
            apply_date;
    `;
    try {
        const [results, fields] = await pool.query(sql);
        const counts = [];
        const dates = [];
        results.forEach((o) => {
            counts.push(o.count);
            dates.push(o.apply_date);
        });
        const data = {
            counts: counts,
            dates: dates,
        }
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({"error": error});
    }
});

export default router;
