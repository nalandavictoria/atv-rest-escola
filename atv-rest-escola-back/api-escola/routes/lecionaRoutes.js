const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM leciona');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    try {
        const { id_professor, id_disciplina } = req.body;
        const result = await pool.query('INSERT INTO leciona (id_professor, id_disciplina) VALUES ($1, $2) RETURNING *', [id_professor, id_disciplina]);
        res.status(201).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/professor/:id_professor/disciplina/:id_disciplina', async (req, res) => {
    try {
        const { id_professor, id_disciplina } = req.params;
        const result = await pool.query('DELETE FROM leciona WHERE id_professor=$1 AND id_disciplina=$2 RETURNING *', [id_professor, id_disciplina]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Vínculo não encontrado' });
        res.json({ message: 'Vínculo removido com sucesso' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;