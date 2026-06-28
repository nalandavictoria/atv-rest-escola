const express = require('express');
const router = express.Router();
const pool = require('../db');

// READ (Listar todas as disciplinas)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM disciplina ORDER BY id_disciplina');
        res.json(result.rows);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// READ (Estatística para o Gráfico: Quantidade de disciplinas por curso)
router.get('/estatistica/disciplinas-por-curso', async (req, res) => {
    try {
        const query = `
            SELECT 
                c.tx_descricao as curso, 
                COUNT(d.id_disciplina)::INTEGER as total
            FROM curso c
            LEFT JOIN disciplina d ON c.id_curso = d.id_curso
            GROUP BY c.tx_descricao
            ORDER BY total DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ error: err.message }); 
    }
});

// READ (Procurar disciplina por ID)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM disciplina WHERE id_disciplina = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Disciplina não encontrada' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (Mestre-Detalhe)
router.get('/curso/:id_curso', async (req, res) => {
    try {
        const { id_curso } = req.params;
        const result = await pool.query('SELECT * FROM disciplina WHERE id_curso = $1 ORDER BY id_disciplina', [id_curso]);
        res.json(result.rows);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// CREATE 
router.post('/', async (req, res) => {
    try {
        const { id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria } = req.body;

        await pool.query(
            'DELETE FROM disciplina WHERE tx_sigla = $1 OR tx_descricao = $2',
            [tx_sigla, tx_descricao]
        );

        const result = await pool.query(
            'INSERT INTO disciplina (id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria]
        );

        res.status(201).json({ message: 'Disciplina criada com sucesso.', dados: result.rows[0] });
    } catch (err) { 
        console.error(err);
        res.status(500).json({ error: err.message }); 
    }
});

// UPDATE 
router.put('/:id', async (req, res) => {
    try {
        const { id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria } = req.body;
        
        const result = await pool.query(
            'UPDATE disciplina SET id_curso=$1, id_tipo_disciplina=$2, tx_sigla=$3, tx_descricao=$4, in_periodo=$5, in_carga_horaria=$6 WHERE id_disciplina=$7 RETURNING *',
            [id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Disciplina não encontrada' });
        res.json(result.rows[0]);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ error: err.message }); 
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM disciplina WHERE id_disciplina = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Disciplina não encontrada' });
        res.json({ message: 'Disciplina removida' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;