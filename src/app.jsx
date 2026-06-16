import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import "./style.css";

const MAPA_GENEROS = {
  "Action": "Ação", "Adventure": "Aventura", "Animation": "Animação", "Comedy": "Comédia",
  "Crime": "Crime", "Documentary": "Documentário", "Drama": "Drama", "Family": "Família",
  "Fantasy": "Fantasia", "History": "História", "Horror": "Terror", "Music": "Musical",
  "Mystery": "Mistério", "Romance": "Romance", "Sci-Fi": "Ficção Científica",
  "Thriller": "Suspense", "War": "Guerra", "Western": "Faroeste"
};

// ==========================================
// --- COMPONENTES REUTILIZÁVEIS ---
// ==========================================

function Pagina404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h2 style={{ color: 'var(--cor-principal)' }}>404 - Página não encontrada</h2>
      <p>Ops! Parece que você tentou acessar um caminho inexistente.</p>
      <br />
      <Link to="/" className="btn">Voltar para o Início</Link>
    </div>
  );
}

function BotaoCinema({ texto, onClick, type = "button", classeExtra = "" }) {
  return (
    <button type={type} onClick={onClick} className={`btn ${classeExtra}`}>
      {texto}
    </button>
  );
}

function CardItem({ titulo, info1, info2, info3, info4, botoesAcao }) {
  return (
    <div className="card-filme" style={{ textAlign: 'left', padding: '15px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--cor-principal)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h4 style={{ color: 'var(--cor-principal)', margin: '0 0 8px 0' }}>{titulo}</h4>
        {info1 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info1}</p>}
        {info2 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info2}</p>}
        {info3 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info3}</p>}
        {info4 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info4}</p>}
      </div>
      {botoesAcao && <div className="botoes-acao-card">{botoesAcao}</div>}
    </div>
  );
}

function AlertaSistema({ mensagem, tipo }) {
  if (!mensagem) return null;
  const colBg = tipo === 'sucesso' ? 'rgba(40, 167, 69, 0.2)' : 'rgba(217, 83, 79, 0.2)';
  const colBorda = tipo === 'sucesso' ? '#28a745' : '#d9534f';
  return (
    <div style={{ padding: '12px', marginBottom: '15px', borderRadius: '5px', background: colBg, border: `1px solid ${colBorda}`, color: '#fff', textAlign: 'center', fontSize: '0.9rem' }}>
      {mensagem}
    </div>
  );
}

function TooltipExplicativa({ texto }) {
  return <span style={{ fontSize: '0.75rem', color: '#aaa', display: 'block', marginTop: '4px', fontStyle: 'italic' }}>💡 {texto}</span>;
}

function Header() {
  const location = useLocation();
  return (
    <header>
      <h1>MVP – Gestão de Locadora</h1>
      <nav className="menu-principal">
        <Link to="/" className={`btn ${location.pathname === '/' ? 'ativo' : ''}`}>Início</Link>
        <Link to="/filmes" className={`btn ${location.pathname === '/filmes' ? 'ativo' : ''}`}>Filmes</Link>
        <Link to="/cadastro" className={`btn ${location.pathname === '/cadastro' ? 'ativo' : ''}`}>Clientes</Link>
      </nav>
    </header>
  );
}

function BoasVindas() {
  return (
    <div className="boas-vindas">
      <h2>Bem-vindo ao Sistema de Gestão</h2>
      <div className="botoes-home">
        <Link to="/filmes" className="btn-home">🎬 Filmes</Link>
        <Link to="/cadastro" className="btn-home">👥 Clientes</Link>
      </div>
    </div>
  );
}

function Home() {
  const [titulo, setTitulo] = useState('');
  const [listaFilmes, setListaFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [alerta, setAlerta] = useState({ msg: '', tipo: '' });

  const lidarComBusca = async () => {
    if (!titulo.trim()) { setAlerta({ msg: "Por favor, digite o título!", tipo: "erro" }); return; }
    setCarregando(true);
    try {
      const url = `http://localhost:5000/filmes/busca_externa?titulo=${encodeURIComponent(titulo.toLowerCase().trim())}`;
      const resposta = await fetch(url);
      const dados = await resposta.json();
      if (!resposta.ok) { setListaFilmes([]); setAlerta({ msg: dados.erro || "Não encontrado.", tipo: "erro" }); }
      else { setListaFilmes([{ ...dados, genero: MAPA_GENEROS[dados.genero?.trim()] || dados.genero }]); setAlerta({msg: '', tipo: ''}); }
    } catch (e) { setAlerta({ msg: "Erro de conexão.", tipo: "erro" }); }
    finally { setCarregando(false); }
  };

  return (
    <section className="secao ativa">
      <h2>Controle de Busca de Filmes</h2>
      <AlertaSistema mensagem={alerta.msg} tipo={alerta.tipo} />
      <div className="formulario">
        <input placeholder="Título do filme" value={titulo} onChange={(e) => {setTitulo(e.target.value); setAlerta({msg: '', tipo: ''})}} />
        <TooltipExplicativa texto="O sistema aceita letras maiúsculas ou minúsculas." />
        <BotaoCinema texto={carregando ? "Buscando..." : "Buscar"} onClick={lidarComBusca} />
      </div>
      <div className="lista-cards">
        {listaFilmes.map((f, i) => <CardItem key={i} titulo={f.titulo} info1={<span><strong>Gênero:</strong> {f.genero}</span>} info2={<span><strong>Ano:</strong> {f.ano}</span>} />)}
      </div>
    </section>
  );
}

function Cadastro() {
  const [idEdicao, setIdEdicao] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  const [listaClientes, setListaClientes] = useState([]);
  const [alerta, setAlerta] = useState({ msg: '', tipo: '' });

  const carregarClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/clientes/');
      if (response.ok) {
        const dados = await response.json();
        const clientesFormatados = dados.map(c => ({
          ...c,
          dataNascimento: c.data_nascimento.split('-').reverse().join('/')
        }));
        setListaClientes(clientesFormatados);
      }
    } catch (err) { console.error("Erro ao carregar:", err); }
  };

  useEffect(() => {
    carregarClientes();
    const interval = setInterval(carregarClientes, 5000);
    return () => clearInterval(interval);
  }, []);

  const dispararMensagem = (msg) => {
    setAlerta({ msg, tipo: 'sucesso' });
    setTimeout(() => setAlerta({ msg: '', tipo: '' }), 3000);
  };

  const maskCpf = (v) => v.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  const maskTel = (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  const maskData = (v) => v.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3').slice(0, 10);

  const validarMaioridade = (data) => {
    const [d, m, a] = data.split('/').map(Number);
    if (!a) return false;
    const n = new Date(a, m - 1, d);
    const hoje = new Date();
    let id = hoje.getFullYear() - n.getFullYear();
    if (hoje.getMonth() < n.getMonth() || (hoje.getMonth() === n.getMonth() && hoje.getDate() < n.getDate())) id--;
    return id >= 18;
  };

  const lidarComEnvio = async (e) => {
    e.preventDefault();
    if (!validarMaioridade(dataNascimento)) { setAlerta({ msg: "Erro: Cliente deve ter +18 anos.", tipo: "erro" }); return; }
    
    const [d, m, a] = dataNascimento.split('/');
    const dadosCliente = { nome, email, telefone, cpf: cpf.replace(/\D/g, ''), data_nascimento: `${a}-${m}-${d}` };
    
    try {
      const response = await fetch(`http://localhost:5000/clientes/${idEdicao ? idEdicao : ''}`, {
        method: idEdicao ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCliente)
      });

      if (response.ok) {
        const dadosResposta = await response.json(); 
        const idExibido = dadosResposta.id ? ` (ID: ${dadosResposta.id})` : "";
        
        dispararMensagem(idEdicao ? "Atualizado com sucesso!" : `Cadastrado com sucesso!${idExibido}`);
        
        carregarClientes();
        setNome(''); setEmail(''); setTelefone(''); setCpf(''); setDataNascimento(''); setIdEdicao(null);
      } else {
        setAlerta({ msg: "Erro ao comunicar com o servidor.", tipo: "erro" });
      }
    } catch (err) { setAlerta({ msg: "Erro de rede.", tipo: "erro" }); }
  };

  const iniciarEdicao = (c) => {
    setIdEdicao(c.id);
    setNome(c.nome); setEmail(c.email); setTelefone(c.telefone); setCpf(c.cpf); setDataNascimento(c.dataNascimento);
    setAlerta({msg: '', tipo: ''});
  };

  const removerCliente = async (id) => {
    await fetch(`http://localhost:5000/clientes/${id}`, { method: 'DELETE' });
    carregarClientes();
    dispararMensagem("Cliente excluído!");
  };

  return (
    <section className="secao ativa">
      <h2>{idEdicao ? "Editar Cliente" : "Cadastro de Clientes"}</h2>
      <AlertaSistema mensagem={alerta.msg} tipo={alerta.tipo} />
      <form className="formulario" onSubmit={lidarComEnvio}>
        <input placeholder="Nome *" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(maskTel(e.target.value))} />
        <input placeholder="CPF *" value={cpf} onChange={(e) => setCpf(maskCpf(e.target.value))} maxLength="14" required />
        <input placeholder="Data Nasc (DD/MM/AAAA)" value={dataNascimento} onChange={(e) => setDataNascimento(maskData(e.target.value))} maxLength="10" required />
        <TooltipExplicativa texto="O sistema permite apenas o cadastro de clientes maiores de 18 anos." />
        <BotaoCinema type="submit" texto={idEdicao ? "Atualizar" : "Cadastrar"} />
      </form>

      <h3>Lista de Clientes</h3>
      <div className="lista-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
        {listaClientes.map((c) => (
          <CardItem key={c.id} titulo={`${c.nome}`}
            info1={<span><strong>ID:</strong> {c.id}<br /><strong>CPF:</strong> {c.cpf}</span>} 
            info2={<span><strong>Email:</strong> {c.email}</span>} 
            info3={<span><strong>Tel:</strong> {c.telefone}</span>} 
            info4={<span><strong>Nasc:</strong> {c.dataNascimento}</span>}
            botoesAcao={
              <>
                <BotaoCinema classeExtra="btn-editar" texto="Editar" onClick={() => iniciarEdicao(c)} />
                <BotaoCinema classeExtra="btn-excluir" texto="Excluir" onClick={() => removerCliente(c.id)} />
              </>
            }
          />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<BoasVindas />} />
          <Route path="/filmes" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </main>
    </Router>
  );
}