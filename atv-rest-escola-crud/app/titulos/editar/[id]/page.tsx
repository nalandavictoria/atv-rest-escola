"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditarTitulo({ params }: PageProps) {
  const { id } = use(params);
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:5000/titulos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Título não encontrado no banco de dados.');
        return res.json();
      })
      .then(data => {
        setDescricao(data.tx_descricao || '');
        setIsLoading(false);
      })
      .catch(err => {
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await fetch(`http://localhost:5000/titulos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx_descricao: descricao })
      });

      if (res.ok) {
        router.push('/titulos');
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'A API retornou um erro inesperado ao atualizar.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Falha na comunicação com o servidor.');
    }
  };

  if (isLoading) return <main className="p-10 text-center text-gray-500 animate-pulse">Carregando dados do título...</main>;

  return (
    <main className="p-10 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Título Acadêmico</h1>
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-xl border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição do Título</label>
          <input 
            type="text" 
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        
        <div className="flex gap-4 pt-2">
          <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium shadow transition-all">
            Salvar Alterações
          </button>
          <Link href="/titulos" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 font-medium transition-all">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}