const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM curso ORDER BY id_curso');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;
        const result = await pool.query(
            'INSERT INTO curso (id_instituicao, id_tipo_curso, tx_descricao) VALUES ($1, $2, $3) RETURNING *',
            [id_instituicao, id_tipo_curso, tx_descricao]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    try {
        const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;
        const result = await pool.query(
            'UPDATE curso SET id_instituicao=$1, id_tipo_curso=$2, tx_descricao=$3 WHERE id_curso=$4 RETURNING *',
            [id_instituicao, id_tipo_curso, tx_descricao, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Curso não encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM curso WHERE id_curso = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Curso não encontrado' });
        res.json({ message: 'Curso removido' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;