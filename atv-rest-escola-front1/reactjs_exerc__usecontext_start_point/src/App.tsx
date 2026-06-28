import React, { useContext, useEffect } from 'react';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import { AppProvider, AppContext } from './contexts/AppContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const MainApp: React.FC = () => {
  const langContext = useContext(LanguageContext);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.atualizarDadosDoBackend) {
      appContext.atualizarDadosDoBackend();
    }
  }, []);

  if (!langContext || !appContext) {
    return null;
  }

  const { language } = langContext;
  const { appData, alterarContextoManual, atualizarDadosDoBackend } = appContext;

  const translations = {
    en: {
      title: "School Management System",
      btnContext: "Change Application Context",
      btnFetch: "Sync with Database"
    },
    pt: {
      title: "Sistema de Gestão Escolar",
      btnContext: "Alterar Contexto da Aplicação",
      btnFetch: "Sincronizar com Banco de Dados"
    }
  };

  const currentText = translations[language as 'en' | 'pt'] || translations['en'];

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>{currentText.title}</h1>
      
      <LanguageSwitcher />

      <section style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '20px' }}>
          <p style={{ margin: '10px 0' }}>🏫 <strong>Nome da Instituição:</strong> {appData.instituicaoNome}</p>
          <p style={{ margin: '10px 0' }}>👨‍🎓 <strong>Total de Alunos (PostgreSQL):</strong> {appData.totalAlunos}</p>
          <p style={{ margin: '10px 0' }}>⚙️ <strong>Status do Sistema:</strong> {appData.statusSistema}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={alterarContextoManual} 
            style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
          >
            {currentText.btnContext}
          </button>
          
          <button 
            onClick={atualizarDadosDoBackend} 
            style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
          >
            {currentText.btnFetch}
          </button>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </LanguageProvider>
  );
}