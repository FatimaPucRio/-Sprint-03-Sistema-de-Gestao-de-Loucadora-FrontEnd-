import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardFilme({ filme }) {
  const navigate = useNavigate(); // Exigência do MVP: usar useNavigate para redirecionamento
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        width: '220px',
        background: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s',
        transform: hovered ? 'scale(1.03)' : 'scale(1)'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img 
        src={filme.capa} 
        alt={filme.titulo} 
        style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '4px' }} 
      />
      <h3 style={{ margin: '10px 0 5px 0', fontSize: '1.2rem', color: '#333' }}>{filme.titulo}</h3>
      <p style={{ color: '#777', fontSize: '0.9rem', margin: '0 0 15px 0' }}>{filme.genero}</p>
      
      <button 
        onClick={() => navigate(`/filme/${filme.id}`)}
        style={{
          background: '#ffcc00',
          color: '#1a1a1a',
          border: 'none',
          padding: '10px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
      >
        🎬 Ver Detalhes
      </button>
    </div>
  );
}