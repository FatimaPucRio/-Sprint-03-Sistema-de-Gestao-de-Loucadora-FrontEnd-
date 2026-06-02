import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import listaFilmesDoJson from '../data/filmes.json';

export default function Detalhes() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [alugado, setAlugado] = useState(false);

  // Encontra o filme correspondente ao ID da URL
  const filme = listaFilmesDoJson.find(f => f.id === parseInt(id));

  // Tratamento caso o usuário digite um ID de filme que não existe
  if (!filme) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>❌ Filme não encontrado!</h2>
        <button onClick={() => navigate('/')} style={{ background: '#1a1a1a', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}>
          Voltar para o Catálogo
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginBottom: '20px', fontWeight: 'bold' }}>
        ⬅ Voltar
      </button>

      {/* Layout de Detalhes Flexbox (Responsivo) */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <img src={filme.capa} alt={filme.titulo} style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }} />
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#1a1a1a' }}>{filme.titulo}</h1>
          <p style={{ background: '#eee', display: 'inline-block', padding: '5px 10px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', color: '#555' }}>
            {filme.genero} • {filme.ano}
          </p>
          
          <h3 style={{ marginTop: '20px', color: '#333' }}>Sinopse</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>{filme.sinopse}</p>

          
          <div style={{ marginTop: '30px' }}>
            {alugado ? (
              <div style={{ background: '#e6f4ea', color: '#137333', padding: '15px', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center' }}>
                🎉 Locação Simulada com Sucesso! Retire sua fita/DVD na nossa unidade.
              </div>
            ) : (
              <button 
                onClick={() => setAlugado(true)}
                style={{
                  width: '100%',
                  background: '#ffcc00',
                  color: '#1a1a1a',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                📀 Alugar Filme (Simulação)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}