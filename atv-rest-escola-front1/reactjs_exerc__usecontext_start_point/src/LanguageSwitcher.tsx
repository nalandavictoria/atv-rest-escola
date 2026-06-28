import React, { useContext } from 'react';
import { LanguageContext } from './contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    return null;
  }

  const { language, switchLanguage } = context;

  return (
    <div style={{ marginBottom: '20px', paddingBottom: '10px' }}>
      <p style={{ margin: '5px 0' }}>Linguagem Atual do Contexto: <span style={{ color: 'blue', fontWeight: 'bold' }}>"{language}"</span></p>
      
      <button 
        onClick={switchLanguage} 
        style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff' }}
      >
        Switch Language...
      </button>
    </div>
  );
};

export default LanguageSwitcher;