"use client";

import { useEffect, useState } from 'react';

interface Curso { id_curso: number; tx_descricao: string; }
interface Disciplina { id_disciplina: number; tx_descricao: string; }

export default function Home() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [cursoSelecionado, setCursoSelecionado] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Carrega a lista de Cursos (Mestre)
  useEffect(() => {
    fetch('http://localhost:5000/cursos')
      .then(res => res.json())
      .then(data => setCursos(data));
  }, []);

  // 2. Carrega Disciplinas quando um curso é selecionado (Detalhe)
  useEffect(() => {
    if (cursoSelecionado) {
      setIsLoading(true);
      fetch(`http://localhost:5000/disciplinas/curso/${cursoSelecionado}`)
        .then(res => res.json())
        .then(data => {
            setDisciplinas(data);
            setIsLoading(false);
        });
    } else {
      setDisciplinas([]);
    }
  }, [cursoSelecionado]);

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Esquema Mestre-Detalhe</h1>

      {/* COMBO MESTRE */}
      <div className="mb-8">
        <label className="block mb-2 font-semibold">Registro Mestre (Cursos):</label>
        <select 
          className="border p-2 w-full rounded"
          onChange={(e) => setCursoSelecionado(e.target.value)}
        >
          <option value="">-- SELECIONE --</option>
          {cursos.map(c => (
            <option key={c.id_curso} value={c.id_curso}>{c.tx_descricao}</option>
          ))}
        </select>
      </div>

      {/* GRID DETALHE */}
      <div>
        <h2 className="text-xl font-bold mb-4">Registro Detalhe (Disciplinas)</h2>
        {isLoading ? <p>Carregando...</p> : (
          <ul className="bg-white shadow rounded-lg p-4">
            {disciplinas.length > 0 ? disciplinas.map(d => (
              <li key={d.id_disciplina} className="p-3 border-b">{d.tx_descricao}</li>
            )) : <p className="text-gray-500">Nenhuma disciplina vinculada.</p>}
          </ul>
        )}
      </div>
    </main>
  );
}