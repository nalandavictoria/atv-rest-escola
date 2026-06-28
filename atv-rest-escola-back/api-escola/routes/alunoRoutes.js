const express = require('express');
const router = express.Router();
const pool = require('../db');

// READ (Listar todos os alunos)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM aluno ORDER BY id_aluno');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (Procurar aluno por ID)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM aluno WHERE id_aluno = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE (Criar novo aluno)
router.post('/', async (req, res) => {
    try {
        const { tx_nome, tx_sexo, dt_nascimento } = req.body;
        const result = await pool.query(
            'INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES ($1, $2, $3) RETURNING *',
            [tx_nome, tx_sexo, dt_nascimento]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE (Atualizar dados de um aluno)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tx_nome, tx_sexo, dt_nascimento } = req.body;
        const result = await pool.query(
            'UPDATE aluno SET tx_nome = $1, tx_sexo = $2, dt_nascimento = $3 WHERE id_aluno = $4 RETURNING *',
            [tx_nome, tx_sexo, dt_nascimento, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE (Remover um aluno)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM aluno WHERE id_aluno = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json({ message: 'Aluno removido com sucesso', aluno: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;