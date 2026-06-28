"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NovaDisciplina() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCombos, setIsLoadingCombos] = useState(true);
  
  // Combos dinâmicos
  const [cursos, setCursos] = useState<any[]>([]);
  const [tiposDisciplina, setTiposDisciplina] = useState<any[]>([]);

  // Dados do formulário
  const [formData, setFormData] = useState({
    tx_sigla: '',
    tx_descricao: '',
    in_periodo: '1',
    in_carga_horaria: '20',
    id_curso: '',
    id_tipo_disciplina: '' // Mantemos a grafia certa para enviar à tabela disciplina
  });

  useEffect(() => {
    // Carrega os combos dinâmicos ao abrir a tela
    Promise.all([
      fetch('http://localhost:5000/cursos').then(res => res.json()),
      fetch('http://localhost:5000/tipos-disciplina').then(res => res.json())
    ]).then(([cursosData, tiposData]) => {
      setCursos(cursosData);
      setTiposDisciplina(tiposData);
      
      // Ajuste crucial: Lendo 'id_tipo_diplina' (sem 'sc') como vem do banco
      if (cursosData.length > 0) setFormData(p => ({ ...p, id_curso: cursosData[0].id_curso.toString() }));
      if (tiposData.length > 0) setFormData(p => ({ ...p, id_tipo_disciplina: tiposData[0].id_tipo_diplina.toString() }));
      
      setIsLoadingCombos(false);
    });
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/disciplinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) router.push('/disciplinas');
      else alert('Erro ao salvar disciplina.');
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com a API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingCombos) return <div className="p-20 text-center font-bold text-blue-600 text-xl">CARREGANDO...</div>;

  return (
    <main className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Inserir Nova Disciplina</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-xl border border-gray-200 grid gap-4">
        
        <div><label className="font-semibold text-sm">Sigla:</label>
          <input type="text" name="tx_sigla" required maxLength={5} value={formData.tx_sigla} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        
        <div><label className="font-semibold text-sm">Descrição:</label>
          <input type="text" name="tx_descricao" required value={formData.tx_descricao} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className="font-semibold text-sm">Período:</label>
            <select name="in_periodo" value={formData.in_periodo} onChange={handleChange} className="w-full border p-2 rounded bg-white">
              {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>
          <div><label className="font-semibold text-sm">Carga Horária:</label>
            <select name="in_carga_horaria" value={formData.in_carga_horaria} onChange={handleChange} className="w-full border p-2 rounded bg-white">
              {[20, 40, 60, 80].map(num => <option key={num} value={num}>{num}h</option>)}
            </select>
          </div>
        </div>

        <div><label className="font-semibold text-sm">Tipo de Disciplina:</label>
          <select name="id_tipo_disciplina" value={formData.id_tipo_disciplina} onChange={handleChange} className="w-full border p-2 rounded bg-white">
            {/* Ajuste crucial: Lendo 't.id_tipo_diplina' */}
            {tiposDisciplina.map((t: any) => <option key={t.id_tipo_diplina} value={t.id_tipo_diplina}>{t.tx_descricao}</option>)}
          </select>
        </div>

        <div><label className="font-semibold text-sm">Curso:</label>
          <select name="id_curso" value={formData.id_curso} onChange={handleChange} className="w-full border p-2 rounded bg-white">
            {cursos.map((c: any) => <option key={c.id_curso} value={c.id_curso}>{c.tx_descricao}</option>)}
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
            {isSubmitting ? 'CARREGANDO...' : 'Adicionar Disciplina'}
          </button>
          <Link href="/disciplinas" className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 text-center">
            Retornar
          </Link>
        </div>
      </form>
    </main>
  );
}