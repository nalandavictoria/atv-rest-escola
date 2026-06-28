-- Tabela: titulo
CREATE TABLE titulo (
    id_titulo SERIAL PRIMARY KEY,
    tx_descricao VARCHAR(150) NOT NULL UNIQUE
);

-- Tabela: instituicao
CREATE TABLE instituicao (
    id_instituicao SERIAL PRIMARY KEY,
    tx_sigla VARCHAR(15) NOT NULL UNIQUE,
    tx_descricao VARCHAR(150) NOT NULL UNIQUE
);

-- Tabela: tipo_curso
CREATE TABLE tipo_curso (
    id_tipo_curso SERIAL PRIMARY KEY,
    tx_descricao VARCHAR(150) NOT NULL UNIQUE
);

-- Tabela: tipo_disciplina
-- Nota: Mantida a grafia exata do diagrama "id_tipo_diplina" para perfeita compatibilidade
CREATE TABLE tipo_disciplina (
    id_tipo_diplina SERIAL PRIMARY KEY,
    tx_descricao VARCHAR(150) NOT NULL UNIQUE
);

-- Tabela: aluno
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    tx_nome VARCHAR(100) NOT NULL,
    tx_sexo CHAR(1) NOT NULL,
    dt_nascimento DATE NOT NULL,
    CONSTRAINT chk_aluno_sexo CHECK (tx_sexo IN ('m', 'f'))
);

-- ============================================================================
-- 2. TABELAS DEPENDENTES (Possuem chaves estrangeiras simples)
-- ============================================================================

-- Tabela: professor
CREATE TABLE professor (
    id_professor SERIAL PRIMARY KEY,
    id_titulo INTEGER NOT NULL,
    tx_nome VARCHAR(50) NOT NULL,
    tx_sexo CHAR(1) NOT NULL DEFAULT 'm',
    tx_estado_civil CHAR(1) NOT NULL DEFAULT 's',
    dt_nascimento DATE NOT NULL,
    tx_telefone VARCHAR(13) NOT NULL,
    
    FOREIGN KEY (id_titulo) REFERENCES titulo(id_titulo) 
        ON UPDATE CASCADE ON DELETE CASCADE,
        
    CONSTRAINT chk_professor_sexo CHECK (tx_sexo IN ('m', 'f')),
    CONSTRAINT chk_professor_estado_civil CHECK (tx_estado_civil IN ('s', 'c', 'd'))
);

-- Tabela: curso
CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    id_instituicao INTEGER NOT NULL,
    id_tipo_curso INTEGER NOT NULL,
    tx_descricao VARCHAR(150) NOT NULL,
    
    FOREIGN KEY (id_instituicao) REFERENCES instituicao(id_instituicao) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_curso) REFERENCES tipo_curso(id_tipo_curso) 
        ON UPDATE CASCADE ON DELETE CASCADE,
        
    -- Nota do DER: "Acrescentar DDL manualmente para criar UNIQUE composto com mais de um campo"
    CONSTRAINT uq_curso_inst_tipo_desc UNIQUE (id_instituicao, id_tipo_curso, tx_descricao)
);

-- Tabela: disciplina
CREATE TABLE disciplina (
    id_disciplina SERIAL PRIMARY KEY,
    id_curso INTEGER, -- Aceita NULL conforme especificado no diagrama
    id_tipo_disciplina INTEGER NOT NULL,
    tx_sigla VARCHAR(10) NOT NULL UNIQUE,
    tx_descricao VARCHAR(150) NOT NULL UNIQUE,
    in_periodo INTEGER NOT NULL,
    in_carga_horaria INTEGER NOT NULL,
    
    FOREIGN KEY (id_tipo_disciplina) REFERENCES tipo_disciplina(id_tipo_diplina) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso) 
        ON UPDATE CASCADE ON DELETE SET NULL,
        
    CONSTRAINT chk_disciplina_periodo CHECK (in_periodo >= 1),
    CONSTRAINT chk_disciplina_carga_horaria CHECK (in_carga_horaria >= 40)
);

-- ============================================================================
-- 3. TABELAS ASSOCIATIVAS / MUITOS-PARA-MUITOS (Possuem chaves compostas)
-- ============================================================================

-- Tabela: leciona
CREATE TABLE leciona (
    id_professor INTEGER NOT NULL,
    id_disciplina INTEGER NOT NULL,
    
    PRIMARY KEY (id_professor, id_disciplina),
    
    FOREIGN KEY (id_professor) REFERENCES professor(id_professor) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabela: cursa
CREATE TABLE cursa (
    id_aluno INTEGER NOT NULL,
    id_disciplina INTEGER NOT NULL,
    in_ano INTEGER NOT NULL,
    in_semestre INTEGER NOT NULL,
    in_faltas INTEGER NOT NULL DEFAULT 0,
    nm_nota1 NUMERIC(4,2) NULL,
    nm_nota2 NUMERIC(4,2) NULL,
    nm_nota3 NUMERIC(4,2) NULL,
    bl_aprovado BOOLEAN NOT NULL DEFAULT false,
    
    -- PK Composta conforme nota explicativa do diagrama
    PRIMARY KEY (id_aluno, id_disciplina, in_ano, in_semestre),
    
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) 
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina) 
        ON UPDATE CASCADE ON DELETE CASCADE,
        
    -- Restrições para assegurar que valores nunca serão menores do que zero
    CONSTRAINT chk_cursa_faltas CHECK (in_faltas >= 0),
    CONSTRAINT chk_cursa_nota1 CHECK (nm_nota1 >= 0),
    CONSTRAINT chk_cursa_nota2 CHECK (nm_nota2 >= 0),
    CONSTRAINT chk_cursa_nota3 CHECK (nm_nota3 >= 0)
);