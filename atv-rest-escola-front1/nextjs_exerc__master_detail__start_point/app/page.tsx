"use client";

import React, { useState, useEffect } from 'react';

interface Curso {
  id: string;
  nome: string;
}

interface Disciplina {
  id: string;
  nome: string;
}

export default function MasterDetailPage() {
  const [cursoSelecionado, setCursoSelecionado] = useState<string>('');
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  
  // 1. DADOS SIMULADOS (MOCK) DOS CURSOS
  const cursosMock: Curso[] = [
    { id: "1", nome: "Análise e Desenvolvimento de Sistemas" },
    { id: "2", nome: "Engenharia de Software" },
    { id: "3", nome: "Sistemas de Informação" }
  ];

  // 2. DADOS SIMULADOS (MOCK) DAS DISCIPLINAS POR CURSO
  const disciplinasMock: Record<string, Disciplina[]> = {
    "1": [
      { id: "ADS101", nome: "Lógica de Programação" },
      { id: "ADS102", nome: "Banco de Dados Relacionais" }
    ],
    "2": [
      { id: "ENG201", nome: "Arquitetura de Software" },
      { id: "ENG202", nome: "Qualidade de Software" },
      { id: "ENG203", nome: "UML e Modelagem" }
    ],
    "3": [
      { id: "SI301", nome: "Gestão de Projetos de TI" },
      { id: "SI302", nome: "Segurança da Informação" }
    ]
  };

  // Atualiza a tabela sempre que um curso diferente for escolhido
  useEffect(() => {
    if (!cursoSelecionado) {
      setDisciplinas([]);
      return;
    }
    
    // Simula o tempo de resposta de uma API real (meio segundo)
    setTimeout(() => {
      setDisciplinas(disciplinasMock[cursoSelecionado] || []);
    }, 500);

  }, [cursoSelecionado]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Esquema Mestre-Detalhe</h1>
          <p className="text-sm text-gray-500 mt-1">
            Selecione um curso para listar dinamicamente suas disciplinas associadas.
          </p>
        </header>

        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          <label htmlFor="curso-select" className="block text-sm font-semibold text-gray-700">
            Registro Mestre (Cursos Disponíveis)
          </label>
          
          <div className="relative max-w-md">
            <select
              id="curso-select"
              value={cursoSelecionado}
              onChange={(e) => setCursoSelecionado(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 appearance-none shadow-sm transition-all"
            >
              <option value="">-- SELECIONE --</option>
              {cursosMock.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nome}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              ▼
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-hidden">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Registro Detalhe (Disciplinas)</h2>

          {!cursoSelecionado ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <span className="text-3xl">📭</span>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                Nenhum curso selecionado. Escolha um registro acima para exibir as disciplinas.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">ID Disciplina</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Nome da Disciplina</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {disciplinas.map((disc) => (
                    <tr key={disc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-400">
                        {disc.id}
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {disc.nome}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}