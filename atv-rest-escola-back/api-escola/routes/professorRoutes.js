const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM professor ORDER BY id_professor');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const { id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
        const result = await pool.query(
            'INSERT INTO professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    try {
        const { id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
        const result = await pool.query(
            'UPDATE professor SET id_titulo=$1, tx_nome=$2, tx_sexo=$3, tx_estado_civil=$4, dt_nascimento=$5, tx_telefone=$6 WHERE id_professor=$7 RETURNING *',
            [id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Professor não encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM professor WHERE id_professor = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Professor não encontrado' });
        res.json({ message: 'Professor removido' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;