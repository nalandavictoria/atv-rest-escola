-- ============================================================================
-- ATIVIDADE 1 - REST ESCOLA: ETAPA 3 (SCRIPT DE INSERÇÕES - 10 POR TABELA)
-- ============================================================================

-- 1. Inserções na tabela: titulo
INSERT INTO titulo (tx_descricao) VALUES
('Graduação'), ('Aperfeiçoamento'), ('Especialização'), ('MBA'), 
('Mestrado'), ('Doutorado'), ('Pós-Doutorado'), ('Livre-Docência'), 
('Técnico'), ('Tecnólogo');

-- 2. Inserções na tabela: instituicao
INSERT INTO instituicao (tx_sigla, tx_descricao) VALUES
('IFPB', 'Instituto Federal da Paraíba'),
('UFCG', 'Universidade Federal de Campina Grande'),
('UFPB', 'Universidade Federal da Paraíba'),
('USP', 'Universidade de São Paulo'),
('UNICAMP', 'Universidade Estadual de Campinas'),
('UFRJ', 'Universidade Federal do Rio de Janeiro'),
('UFMG', 'Universidade Federal de Minas Gerais'),
('UFRGS', 'Universidade Federal do Rio Grande do Sul'),
('UFPE', 'Universidade Federal de Pernambuco'),
('UNB', 'Universidade de Brasília');

-- 3. Inserções na tabela: tipo_curso
INSERT INTO tipo_curso (tx_descricao) VALUES
('Bacharelado'), ('Licenciatura'), ('Tecnologia'), ('Extensão'),
('Especialização Lato Sensu'), ('Stricto Sensu - Mestrado'), 
('Stricto Sensu - Doutorado'), ('Curso Livre'), ('Aperfeiçoamento Profissional'),
('Residência Residencial');

-- 4. Inserções na tabela: tipo_disciplina
INSERT INTO tipo_disciplina (tx_descricao) VALUES
('Obrigatória'), ('Optativa'), ('Eletiva'), ('Trabalho de Conclusão de Curso'),
('Estágio Supervisionado'), ('Atividade Complementar'), ('Laboratório'),
('Seminário'), ('Projeto Integrador'), ('Teórica');

-- 5. Inserções na tabela: aluno
INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES
('Ana Souza', 'f', '2000-01-10'),
('Bruno Lima', 'm', '1999-03-15'),
('Carla Mendes', 'f', '2001-07-20'),
('Daniel Rocha', 'm', '1998-05-12'),
('Eduarda Silva', 'f', '2002-11-30'),
('Felipe Santos', 'm', '2000-09-25'),
('Gabriela Alves', 'f', '1997-02-18'),
('Henrique Costa', 'm', '1996-06-05'),
('Isabela Ramos', 'f', '2003-04-14'),
('João Pedro', 'm', '2001-12-01');

-- 6. Inserções na tabela: professor
INSERT INTO professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone) VALUES
(5, 'Carlos Alberto', 'm', 'c', '1980-05-14', '83988881111'),
(6, 'Mariana Luz', 'f', 's', '1985-09-22', '83988882222'),
(6, 'Roberto Jefferson', 'm', 'd', '1974-02-11', '83988883333'),
(4, 'Patrícia Pillar', 'f', 'c', '1988-12-05', '83988884444'),
(7, 'Fernando Henrique', 'm', 's', '1968-07-19', '83988885555'),
(5, 'Juliana Paes', 'f', 'c', '1982-04-30', '83988886666'),
(6, 'Marcelo Rossi', 'm', 's', '1979-11-12', '83988887777'),
(3, 'Beatriz Segall', 'f', 'd', '1990-01-25', '83988888888'),
(8, 'Antônio Fagundes', 'm', 'c', '1962-08-14', '83988889999'),
(6, 'Glória Pires', 'f', 's', '1977-06-03', '83988880000');

-- 7. Inserções na tabela: curso
INSERT INTO curso (id_instituicao, id_tipo_curso, tx_descricao) VALUES
(1, 3, 'Sistemas para Internet'),
(1, 3, 'Automação Industrial'),
(2, 1, 'Ciência da Computação'),
(2, 1, 'Engenharia Elétrica'),
(3, 1, 'Engenharia de Software'),
(4, 6, 'Mestrado em Informática'),
(5, 7, 'Doutorado em Computação'),
(6, 1, 'Análise de Sistemas'),
(9, 3, 'Redes de Computadores'),
(10, 4, 'Desenvolvimento Web Moderno');

-- 8. Inserções na tabela: disciplina
INSERT INTO disciplina (id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria) VALUES
(1, 1, 'BD1', 'Banco de Dados I', 3, 60),
(1, 1, 'PWEB1', 'Programação Web I', 4, 80),
(3, 1, 'ED', 'Estrutura de Dados', 2, 90),
(5, 1, 'ES2', 'Engenharia de Software II', 5, 60),
(2, 7, 'LAB-ELET', 'Laboratório de Eletrônica', 1, 45),
(6, 8, 'SEM-IND', 'Seminários de Indústria 4.0', 1, 40),
(7, 10, 'TOP-AV', 'Tópicos Avançados em IA', 2, 60),
(8, 1, 'POO', 'Programação Orientada a Objetos', 2, 80),
(9, 1, 'REDES1', 'Redes de Computadores I', 3, 70),
(10, 9, 'PI-WEB', 'Projeto Integrador Web', 1, 50);

-- 9. Inserções na tabela: leciona
INSERT INTO leciona (id_professor, id_disciplina) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

-- 10. Inserções na tabela: cursa
INSERT INTO cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado) VALUES
(1, 1, 2026, 1, 2, 8.5, 7.0, 9.0, true),
(2, 2, 2026, 1, 0, 9.0, 8.0, 8.5, true),
(3, 3, 2026, 1, 6, 5.5, 6.0, 4.0, false),
(4, 4, 2026, 1, 1, 7.5, 7.5, 8.0, true),
(5, 5, 2026, 1, 4, 6.0, 5.0, 7.0, true),
(6, 6, 2026, 1, 0, 10.0, 9.5, 10.0, true),
(7, 7, 2026, 1, 12, 3.0, 2.5, 0.0, false),
(8, 8, 2026, 1, 3, 8.0, 7.0, 7.5, true),
(9, 9, 2026, 1, 2, 7.0, 6.5, 8.0, true),
(10, 10, 2026, 1, 0, 9.5, 9.0, 9.0, true);