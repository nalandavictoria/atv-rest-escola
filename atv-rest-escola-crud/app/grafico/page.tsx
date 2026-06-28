"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraficoDisciplinas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/disciplinas/estatistica/disciplinas-por-curso')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <main className="p-10 font-sans">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Quantidade de Disciplinas por Curso
      </h1>

      <div className="h-[500px] w-full bg-white p-5 shadow-lg rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="curso" type="category" width={90} />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" radius={[0, 5, 5, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}