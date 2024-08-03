import Router from "express";

import pool from "../util/database.js";
import { authenticateToken } from "../util/token.js";

const router = Router();

router.get("/metrics/count-per-day", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const sql = `
        SELECT
            COUNT(*) AS count,
            apply_date
        FROM
            job
        JOIN 
            user_job ON job.id = user_job.job_id
        WHERE 
            user_job.user_id = ?
        GROUP BY
            apply_date
        ORDER BY
            apply_date;
    `;
    try {
        const [results, fields] = await pool.query(sql, [userId]);
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
