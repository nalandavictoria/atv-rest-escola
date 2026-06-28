"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Titulo {
  id_titulo: number;
  tx_descricao: string;
}

export default function ListagemTitulos() {
  const [titulos, setTitulos] = useState<Titulo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const carregarTitulos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000/titulos');
      const data = await res.json();
      setTitulos(data);
    } catch (error) {
      console.error("Erro ao buscar títulos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarTitulos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este título de forma permanente?')) {
      try {
        const res = await fetch(`http://localhost:5000/titulos/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          carregarTitulos(); // Recarrega a lista após deletar
        } else {
          alert('Erro ao tentar excluir o título no servidor.');
        }
      } catch (error) {
        console.error("Erro na requisição de exclusão:", error);
      }
    }
  };

  return (
    <main className="p-10 max-w-4xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Títulos Acadêmicos</h1>
        <Link href="/titulos/novo" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow transition font-medium">
          + Novo Título
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-blue-600 font-semibold animate-pulse text-lg">Carregando títulos...</p>
        </div>
      ) : titulos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-white">
          <p className="text-gray-500">Nenhum título cadastrado no banco de dados.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Descrição do Título</th>
                <th className="px-6 py-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {titulos.map((titulo) => (
                <tr key={titulo.id_titulo} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-400">{titulo.id_titulo}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{titulo.tx_descricao}</td>
                  <td className="px-6 py-4 text-center space-x-4">
                    <Link href={`/titulos/editar/${titulo.id_titulo}`} className="text-yellow-600 hover:text-yellow-700 font-medium hover:underline">
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(titulo.id_titulo)} className="text-red-600 hover:text-red-700 font-medium hover:underline">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}