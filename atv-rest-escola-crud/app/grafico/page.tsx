'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function GraficosPage() {
  const [cursosInst, setCursosInst] = useState([]);
  const [discProf, setDiscProf] = useState([]);
  const [profCivil, setProfCivil] = useState([]);
  const [reprovacoes, setReprovacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  useEffect(() => {
    // Aponta para a porta 5000 configurada no seu server.js
    const baseURL = 'http://localhost:5000/api';

    Promise.all([
      fetch(`${baseURL}/cursos_por_instituicao`).then(res => res.json()),
      fetch(`${baseURL}/disciplinas_por_professor`).then(res => res.json()),
      fetch(`${baseURL}/professores_por_estado_civil`).then(res => res.json()),
      fetch(`${baseURL}/reprovacoes_por_ano`).then(res => res.json())
    ])
    .then(([cursos, disciplinas, professores, reprov]) => {
      // Trata e converte as strings de quantidade para números
      const cursosTratados = cursos.map((item: any) => ({
        ...item,
        quantidade: Number(item.quantidade || 0)
      }));
      
      const disciplinasTratadas = disciplinas.map((item: any) => ({
        ...item,
        quantidade: Number(item.quantidade || 0)
      }));

      const professoresTratados = professores.map((item: any) => ({
        ...item,
        quantidade: Number(item.quantidade || 0)
      }));

      const reprovacoesTratadas = reprov.map((item: any) => ({
        ...item,
        quantidade: Number(item.quantidade || 0)
      }));

      setCursosInst(cursosTratados);
      setDiscProf(disciplinasTratadas);
      setProfCivil(professoresTratados);
      setReprovacoes(reprovacoesTratadas);
      setLoading(false);
    })
    .catch(err => {
      console.error("Erro ao carregar dados dos gráficos:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-xl font-medium">
        Carregando dados do painel...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-900">Dashboard de Visualização de Dados</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Questão 2: Gráfico de Barras Vertical */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Quantidade de Cursos por Instituição</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cursosInst}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="instituicao" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#4f46e5" name="Cursos" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Questão 3: Gráfico de Barras Horizontal */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Quantidade de Disciplinas por Professor</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={discProf} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="professor" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#0ea5e9" name="Disciplinas" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Questão 4: Gráfico de Pizza */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Distribuição de Professores por Estado Civil</h2>
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={profCivil}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={(props) => {
                    const payload: any = (props as any).payload;
                    const percent: number = (props as any).percent ?? 0;
                    return `${payload?.estado_civil ?? ''}: ${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantidade"
                >
                  {profCivil.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Questão 5: Gráfico de Linha */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Quantidade de Reprovações ao Longo dos Anos</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reprovacoes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quantidade" stroke="#ef4444" strokeWidth={2} name="Reprovações" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}