const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM instituicao ORDER BY id_instituicao');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const { tx_sigla, tx_descricao } = req.body;
        const result = await pool.query('INSERT INTO instituicao (tx_sigla, tx_descricao) VALUES ($1, $2) RETURNING *', [tx_sigla, tx_descricao]);
        res.status(201).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    try {
        const { tx_sigla, tx_descricao } = req.body;
        const result = await pool.query('UPDATE instituicao SET tx_sigla=$1, tx_descricao=$2 WHERE id_instituicao=$3 RETURNING *', [tx_sigla, tx_descricao, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Instituição não encontrada' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM instituicao WHERE id_instituicao = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Instituição não encontrada' });
        res.json({ message: 'Instituição removida com sucesso' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;