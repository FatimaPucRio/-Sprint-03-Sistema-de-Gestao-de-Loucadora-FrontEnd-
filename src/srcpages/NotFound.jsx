import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '4rem', margin: 0, color: '#ff4d4d' }}>404</h1>
      <h2>📼 Ih, deu erro no rebobinamento!</h2>
      <p style={{ color: '#666' }}>A página que você está tentando acessar não existe no catálogo da locadora.</p>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: '#1a1a1a', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }}
      >
        Voltar para a Home
      </button>
    </div>
  );
}