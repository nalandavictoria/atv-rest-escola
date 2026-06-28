import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const themeColor = '#5c6bc0'; 

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e8eaf6; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
`;

const FormContainer = styled.form`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 16px; 
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  color: ${themeColor};
  text-align: center;
  margin: 0 0 10px 0;
  font-size: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #424242;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid transparent;
  border-radius: 8px; 
  background-color: #f5f5f5; 
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background-color: #ffffff;
    border-color: ${themeColor};
    box-shadow: 0 0 0 3px rgba(92, 107, 192, 0.2);
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color: ${themeColor};
  color: white;
  border: none;
  border-radius: 8px; 
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #3f51b5; 
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(63, 81, 181, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  color: #2e7d32;
  background-color: #e8f5e9;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`;

export default function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  
  const [status, setStatus] = useState(''); 

  // TIPO ADICIONADO AQUI: React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setStatus(''); 
  };

  // TIPO ADICIONADO AQUI: React.FormEvent<HTMLFormElement>
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (!formData.nome || !formData.email || !formData.senha) {
      setStatus('error');
      return;
    }

    setStatus('success');
  };

  return (
    <>
      <GlobalStyle />
      <FormContainer onSubmit={handleSubmit}>
        <Title>Criar Conta</Title>

        {status === 'error' && (
          <ErrorMessage>
            Por favor, preencha todos os campos obrigatórios!
          </ErrorMessage>
        )}

        {status === 'success' && (
          <SuccessMessage>
            Formulário validado e submetido com sucesso!
          </SuccessMessage>
        )}

        <InputGroup>
          <Label htmlFor="nome">Nome Completo</Label>
          <Input 
            type="text" 
            id="nome" 
            name="nome" 
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="senha">Senha</Label>
          <Input 
            type="password" 
            id="senha" 
            name="senha" 
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
        </InputGroup>

        <Button type="submit">Cadastrar</Button>
      </FormContainer>
    </>
  );
}