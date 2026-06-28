import React, { createContext, useState, useEffect, ReactNode } from 'react';

// 1. Definimos o tipo do que estará dentro do Contexto
interface LanguageContextType {
  language: string;
  switchLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Questão 3: Inicializa com o valor salvo no localStorage ou o padrão 'en'
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('app_language');
    return savedLanguage ? savedLanguage : 'en';
  });

  // Salva no localStorage sempre que a linguagem mudar (Persistência)
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'pt' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};