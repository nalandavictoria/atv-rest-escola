const express = require('express');
const cors = require('cors'); 

const app = express(); 

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json()); 

const alunoRoutes = require('./routes/alunoRoutes');
const tituloRoutes = require('./routes/tituloRoutes');
const professorRoutes = require('./routes/professorRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const cursaRoutes = require('./routes/cursaRoutes');
const instituicaoRoutes = require('./routes/instituicaoRoutes');
const tipoCursoRoutes = require('./routes/tipoCursoRoutes');
const tipoDisciplinaRoutes = require('./routes/tipoDisciplinaRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const lecionaRoutes = require('./routes/lecionaRoutes');
const graficoRoutes = require('./routes/graficoRoutes');

app.use('/alunos', alunoRoutes);
app.use('/titulos', tituloRoutes);
app.use('/professores', professorRoutes);
app.use('/cursos', cursoRoutes);
app.use('/cursa', cursaRoutes);
app.use('/instituicoes', instituicaoRoutes);
app.use('/tipos-curso', tipoCursoRoutes);
app.use('/tipos-disciplina', tipoDisciplinaRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/leciona', lecionaRoutes);

app.use('/api', graficoRoutes); 

app.listen(5000, () => {
  console.log('API rodando perfeitamente em http://localhost:5000');
});