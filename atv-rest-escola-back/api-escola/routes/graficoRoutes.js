const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/cursos_por_instituicao', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT i.nome AS instituicao, COUNT(c.id) AS quantidade 
            FROM instituicao i
            LEFT JOIN curso c ON c.instituicao_id = i.id
            GROUP BY i.nome
        `);
        res.json(result.recordset || result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/disciplinas_por_professor', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT p.nome AS professor, COUNT(l.disciplina_id) AS quantidade
            FROM professor p
            LEFT JOIN leciona l ON l.professor_id = p.id
            GROUP BY p.nome
        `);
        res.json(result.recordset || result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/professores_por_estado_civil', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT estado_civil, COUNT(id) AS quantidade
            FROM professor
            GROUP BY estado_civil
        `);
        res.json(result.recordset || result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/reprovacoes_por_ano', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT ano, COUNT(*) AS quantidade
            FROM cursa
            WHERE status = 'Reprovado'
            GROUP BY ano
            ORDER BY ano ASC
        `);
        res.json(result.recordset || result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;