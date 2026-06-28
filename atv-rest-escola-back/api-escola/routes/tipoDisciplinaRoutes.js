const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tipo_disciplina ORDER BY id_tipo_diplina');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const { tx_descricao } = req.body;
        const result = await pool.query('INSERT INTO tipo_disciplina (tx_descricao) VALUES ($1) RETURNING *', [tx_descricao]);
        res.status(201).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    try {
        const { tx_descricao } = req.body;
        const result = await pool.query('UPDATE tipo_disciplina SET tx_descricao=$1 WHERE id_tipo_diplina=$2 RETURNING *', [tx_descricao, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Tipo de disciplina não encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM tipo_disciplina WHERE id_tipo_diplina = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Tipo de disciplina não encontrado' });
        res.json({ message: 'Tipo de disciplina removido' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;