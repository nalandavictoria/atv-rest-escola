import React, { createContext, useState, useEffect, ReactNode } from 'react';

// 1. Definimos a estrutura das 3 variáveis da Questão 2
interface AppDataState {
  instituicaoNome: string;
  totalAlunos: number;
  statusSistema: string;
}

// 2. Definimos as funções e estados que o contexto vai exportar
interface AppContextType {
  appData: AppDataState;
  alterarContextoManual: () => void;
  atualizarDadosDoBackend: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Questão 2 e 3: Estado com as 3 variáveis iniciando do localStorage se existirem
  const [appData, setAppData] = useState<AppDataState>(() => {
    const savedData = localStorage.getItem('app_context_data');
    return savedData ? JSON.parse(savedData) : {
      instituicaoNome: "Escola Padrão Tech",
      totalAlunos: 0,
      statusSistema: "Operacional"
    };
  });

  // Sincroniza as alterações com o localStorage para não perder no F5
  useEffect(() => {
    localStorage.setItem('app_context_data', JSON.stringify(appData));
  }, [appData]);

  // Função que conecta com a rota '/alunos' do seu server.js
  const atualizarDadosDoBackend = async () => {
    try {
      const response = await fetch('http://localhost:3000/alunos');
      if (response.ok) {
        const alunos = await response.json();
        setAppData(prev => ({
          ...prev,
          totalAlunos: alunos.length,
          statusSistema: "Sincronizado com API"
        }));
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend Escola:", error);
      setAppData(prev => ({
        ...prev,
        statusSistema: "Erro de Conexão com a API"
      }));
    }
  };

  // Altera os valores manualmente conforme a imagem da Questão 2 pedir
  const alterarContextoManual = () => {
    setAppData({
      instituicaoNome: "Instituto Avançado de Tecnologia",
      totalAlunos: 42,
      statusSistema: "Manutenção Requerida"
    });
  };

  return (
    <AppContext.Provider value={{ appData, alterarContextoManual, atualizarDadosDoBackend }}>
      {children}
    </AppContext.Provider>
  );
};