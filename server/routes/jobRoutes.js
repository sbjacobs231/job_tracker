import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all jobs
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM job';
    db.query(sql, (err, results) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get job by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM job WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.json(results[0]);
    });
});

// Create new job
router.post('/', (req, res) => {
    const { title, company, salary, location, apply_date } = req.body;
    const sql = 'INSERT INTO job (title, company, salary, location, apply_date) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, company, salary, location, apply_date], (err, result) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.json({ id: result.insertId, title, company, salary, location, apply_date });
    });
});

// Update job
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, company, salary, location, apply_date } = req.body;
    const sql = 'UPDATE job SET title = ?, company = ?, salary = ?, location = ?, apply_date = ? WHERE id = ?';
    db.query(sql, [title, company, salary, location, apply_date, id], (err, result) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.json({ message: 'Job updated successfully' });
    });
});

// Delete job
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM job WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
        return res.status(500).send(err);
        }
        res.json({ message: 'Job deleted successfully' });
    });
});

export default router;
