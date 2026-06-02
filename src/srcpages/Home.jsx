import React, { useState, useEffect } from 'react';
import listaFilmesDoJson from '../data/filmes.json';
import CardFilme from '../components/CardFilme';

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setFilmes(listaFilmesDoJson);
      setCarregando(false);
    }, 800); 
    return () => clearTimeout(timer);
  }, []);

  // Filtra os filmes dinamicamente com base no que o usuário digita
  const filmesFiltrados = filmes.filter(filme => 
    filme.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    filme.genero.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1a1a1a' }}>🍿 Catálogo de Filmes</h1>
      
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Busque por título ou gênero (ex: Matrix, Ficção)..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '12px 20px',
            borderRadius: '25px',
            border: '2px solid #1a1a1a',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

   
      {carregando && (
        <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
          ⏳ Carregando catálogo...
        </div>
      )}

     
      {!carregando && filmesFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', color: '#ff4d4d', fontSize: '1.1rem', marginTop: '20px' }}>
          ❌ Nenhum filme encontrado para "{busca}".
        </div>
      )}

   
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '25px',
        justifyItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {!carregando && filmesFiltrados.map(filme => (
          <CardFilme key={filme.id} filme={filme} />
        ))}
      </div>
    </div>
  );
}