import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation(); // Exigência do MVP: usar useLocation para ler a URL atual

  return (
    <nav style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '20px', 
      background: '#1a1a1a', 
      color: 'white',
      alignItems: 'center'
    }}>
      <h2>🎬 Blockbuster MVP</h2>
      <div>
        <Link to="/" style={{ color: location.pathname === '/' ? '#ffcc00' : 'white', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>
          🍿 Catálogo & Busca
        </Link>
        <Link to="/cadastro" style={{ color: location.pathname === '/cadastro' ? '#ffcc00' : 'white', margin: '0 15px', textDecoration: 'none', fontWeight: 'bold' }}>
          📝 Cadastros
        </Link>
      </div>
    </nav>
  );
}