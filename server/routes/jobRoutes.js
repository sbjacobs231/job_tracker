// import express from 'express';
// import db from '../util/db.js';

// const router = express.Router();

// // Base route in index.js: app.use("/api/jobs", jobRoutes);

// // Get all jobs
// router.get('/', (req, res) => {
//     const sql = 'SELECT * FROM job';
//     db.query(sql, (err, results) => {
//         if (err) {
//         return res.status(500).send(err);
//         }
//         res.json(results);
//     });
// });

// // Get job by ID
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = 'SELECT * FROM job WHERE id = ?';
//     db.query(sql, [id], (err, results) => {
//         if (err) {
//         return res.status(500).send(err);
//         }
//         res.json(results[0]);
//     });
// });

// // Create new job
// router.post('/', (req, res) => {
//     const { title, company, salary, location, apply_date } = req.body;
//     const sql = 'INSERT INTO job (title, company, salary, location, apply_date) VALUES (?, ?, ?, ?, ?)';
//     db.query(sql, [title, company, salary, location, apply_date], (err, result) => {
//         if (err) {
//         return res.status(500).send(err);
//         }
//         res.json({ id: result.insertId, title, company, salary, location, apply_date });
//     });
// });

// // Update job
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { title, company, salary, location, apply_date } = req.body;
//     const sql = 'UPDATE job SET title = ?, company = ?, salary = ?, location = ?, apply_date = ? WHERE id = ?';
//     db.query(sql, [title, company, salary, location, apply_date, id], (err, result) => {
//         if (err) {
//         return res.status(500).send(err);
//         }
//         res.json({ message: 'Job updated successfully' });
//     });
// });

// // Delete job
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = 'DELETE FROM job WHERE id = ?';
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//         return res.status(500).send(err);
//         }
//         res.json({ message: 'Job deleted successfully' });
//     });
// });

// export default router;

//=========================== Promise-based ================================

import express from 'express';
import pool from '../util/database.js';
import { authenticateToken } from '../util/token.js';

const router = express.Router();

// Base route in index.js: app.use("/api/jobs", jobRoutes);

// Get all jobs
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const sql = `
        SELECT * FROM job
        JOIN user_job ON job.id = user_job.job_id
        WHERE user_job.user_id = ?
    `;
    try {
        const [results] = await pool.query(sql, [userId]);
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get job by ID
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM job WHERE id = ?';
    try {
        const [results] = await pool.query(sql, [id]);
        res.json(results[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create new job
router.post('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { title, company, salary, location, apply_date } = req.body;
    const sqlJob = `
        INSERT INTO job (title, company, salary, location, apply_date)
        VALUES (?, ?, ?, ?, ?)
    `;
    const sqlUserJob = 'INSERT INTO user_job (user_id, job_id) VALUES (?, ?)'
    try {
        const [jobResult] = await pool.query(sqlJob, [title, company, salary, location, apply_date]);
        await pool.query(sqlUserJob, [userId, jobResult.insertId])
        res.json({ id: jobResult.insertId, title, company, salary, location, apply_date });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update job (by id)
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, company, salary, location, apply_date } = req.body;
    const sql = 'UPDATE job SET title = ?, company = ?, salary = ?, location = ?, apply_date = ? WHERE id = ?';
    try {
        await pool.query(sql, [title, company, salary, location, apply_date, id]);
        res.json({ message: 'Job updated successfully' });
    } catch (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});

// Delete job (by id)
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userJobSql = 'DELETE FROM user_job WHERE job_id = ?'
    const jobSql = 'DELETE FROM job WHERE id = ?';
    try {
        await pool.query(userJobSql, [id])
        await pool.query(jobSql, [id]);
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
