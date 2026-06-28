"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NovoTitulo() {
  const [descricao, setDescricao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/titulos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx_descricao: descricao })
      });

      if (res.ok) {
        router.push('/titulos'); // Redireciona de volta para a listagem
      } else {
        alert('Erro ao salvar o novo título.');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Título</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-xl border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição do Título</label>
          <input 
            type="text" 
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Ex: Mestre em Engenharia de Software"
          />
        </div>
        
        <div className="flex gap-4 pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium shadow disabled:opacity-50 transition-all"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
          <Link href="/titulos" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 font-medium transition-all">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}