const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cursa');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// CREATE (Matricular aluno numa disciplina)
router.post('/', async (req, res) => {
    try {
        const { id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado } = req.body;
        const result = await pool.query(
            'INSERT INTO cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [id_aluno, id_disciplina, in_ano, in_semestre, in_faltas || 0, nm_nota1, nm_nota2, nm_nota3, bl_aprovado || false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// UPDATE - Refatorado para o padrão correto REST utilizando parâmetros na rota
router.put('/aluno/:id_aluno/disciplina/:id_disciplina/ano/:in_ano/semestre/:in_semestre', async (req, res) => {
    try {
        const { id_aluno, id_disciplina, in_ano, in_semestre } = req.params;
        const { in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado } = req.body;
        
        const result = await pool.query(
            'UPDATE cursa SET in_faltas=$1, nm_nota1=$2, nm_nota2=$3, nm_nota3=$4, bl_aprovado=$5 WHERE id_aluno=$6 AND id_disciplina=$7 AND in_ano=$8 AND in_semestre=$9 RETURNING *',
            [in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado, id_aluno, id_disciplina, in_ano, in_semestre]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Registo de matrícula não encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE - Adicionado para complementar o CRUD desta tabela
router.delete('/aluno/:id_aluno/disciplina/:id_disciplina/ano/:in_ano/semestre/:in_semestre', async (req, res) => {
    try {
        const { id_aluno, id_disciplina, in_ano, in_semestre } = req.params;
        const result = await pool.query(
            'DELETE FROM cursa WHERE id_aluno=$1 AND id_disciplina=$2 AND in_ano=$3 AND in_semestre=$4 RETURNING *',
            [id_aluno, id_disciplina, in_ano, in_semestre]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Registo não encontrado' });
        res.json({ message: 'Matrícula removida com sucesso' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;