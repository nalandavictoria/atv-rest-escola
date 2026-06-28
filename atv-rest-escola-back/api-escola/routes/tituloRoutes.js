const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM titulo ORDER BY id_titulo');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM titulo WHERE id_titulo = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Título não encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const { tx_descricao } = req.body;
        const result = await pool.query('INSERT INTO titulo (tx_descricao) VALUES ($1) RETURNING *', [tx_descricao]);
        res.status(201).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    try {
        const { tx_descricao } = req.body;
        const result = await pool.query('UPDATE titulo SET tx_descricao = $1 WHERE id_titulo = $2 RETURNING *', [tx_descricao, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Título não encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM titulo WHERE id_titulo = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Título não encontrado' });
        res.json({ message: 'Título removido com sucesso' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;