import React, { useState } from 'react';

export default function Cadastro() {
  // Estados para o formulário de Cliente 
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');
  const [feedbackCliente, setFeedbackCliente] = useState('');

  const handleCadastroCliente = (e) => {
    e.preventDefault();
    if (!nomeCliente || !emailCliente || !cpfCliente) return;

    setFeedbackCliente(`✅ Cliente "${nomeCliente}" cadastrado com sucesso!`);
  
    setNomeCliente('');
    setEmailCliente('');
    setCpfCliente('');

    setTimeout(() => setFeedbackCliente(''), 3000);
  };

 
  const boxStyle = {
    background: '#f9f9f9',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '450px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0 20px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    background: '#1a1a1a',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1a1a1a' }}>📝 Área de Cadastro de Clientes</h1>

    
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        
        {/* FORMULÁRIO: CADASTRO DE CLIENTE */}
        <div style={boxStyle}>
          <h2 style={{ marginTop: 0, color: '#333' }}>👤 Cadastrar Cliente</h2>
          
          {feedbackCliente && (
            <div style={{ padding: '10px', background: '#e6f4ea', color: '#137333', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
              {feedbackCliente}
            </div>
          )}

          <form onSubmit={handleCadastroCliente}>
            <label style={{ fontWeight: 'bold' }}>Nome Completo:</label>
            <input 
              type="text" 
              placeholder="Ex: João Silva" 
              value={nomeCliente} 
              onChange={(e) => setNomeCliente(e.target.value)}
              style={inputStyle}
              required
            />

            <label style={{ fontWeight: 'bold' }}>CPF:</label>
            <input 
              type="text" 
              placeholder="Ex: 000.000.000-00" 
              value={cpfCliente} 
              onChange={(e) => setCpfCliente(e.target.value)}
              style={inputStyle}
              required
            />

            <label style={{ fontWeight: 'bold' }}>E-mail:</label>
            <input 
              type="email" 
              placeholder="Ex: joao@email.com" 
              value={emailCliente} 
              onChange={(e) => setEmailCliente(e.target.value)}
              style={inputStyle}
              required
            />

            <button type="submit" style={buttonStyle}>Salvar Cliente</button>
          </form>
        </div>

      </div>
    </div>
  );
}