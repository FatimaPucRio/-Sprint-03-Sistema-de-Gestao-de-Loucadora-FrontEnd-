import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import "./style.css";

const MAPA_GENEROS = {
    "Action": "Ação",
    "Adventure": "Aventura",
    "Animation": "Animação",
    "Comedy": "Comédia",
    "Crime": "Crime",
    "Documentary": "Documentário",
    "Drama": "Drama",
    "Family": "Família",
    "Fantasy": "Fantasia",
    "History": "História",
    "Horror": "Terror",
    "Music": "Musical",
    "Mystery": "Mistério",
    "Romance": "Romance",
    "Sci-Fi": "Ficção Científica",
    "Thriller": "Suspense",
    "War": "Guerra",
    "Western": "Faroeste"
};

// ==========================================
// --- COMPONENTES REUTILIZÁVEIS ---
// ==========================================
function BotaoCinema({ texto, onClick, type = "button", classeExtra = "" }) {
  return (
    <button type={type} onClick={onClick} className={`btn ${classeExtra}`}>
      {texto}
    </button>
  );
}

function CardItem({ titulo, subtitulo, info1, info2, info3, info4, botoesAcao }) {
  return (
    <div className="card-filme" style={{ textAlign: 'left', padding: '15px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--azul-neon)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h4 style={{ color: 'var(--azul-neon)', margin: '0 0 8px 0' }}>{titulo}</h4>
        {subtitulo && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}><em>{subtitulo}</em></p>}
        {info1 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info1}</p>}
        {info2 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info2}</p>}
        {info3 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info3}</p>}
        {info4 && <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>{info4}</p>}
      </div>
      {botoesAcao && <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>{botoesAcao}</div>}
    </div>
  );
}


function AlertaSistema({ mensagem, tipo }) {
  if (!mensagem) return null;
  const colBg = tipo === 'sucesso' ? 'rgba(40, 167, 69, 0.2)' : 'rgba(217, 83, 79, 0.2)';
  const colBorda = tipo === 'sucesso' ? '#28a745' : '#d9534f';
  const colTexto = '#fff'; 

  return (
    <div style={{ padding: '12px', marginBottom: '15px', borderRadius: '5px', background: colBg, border: `1px solid ${colBorda}`, color: colTexto, textAlign: 'center', fontSize: '0.9rem' }}>
      {mensagem}
    </div>
  );
}

function TooltipExplicativa({ texto }) {
  return (
    <span style={{ fontSize: '0.75rem', color: '#aaa', display: 'block', marginTop: '4px', fontStyle: 'italic' }}>
      💡 {texto}
    </span>
  );
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
      <p>Selecione uma das opções abaixo para gerenciar a sua locadora:</p>
      <div className="botoes-home">
        <Link to="/filmes" className="btn-home">🎬 Filmes</Link>
        <Link to="/cadastro" className="btn-home">👥 Clientes</Link>
      </div>
    </div>
  );
}

// --- PÁGINA 1: BUSCA DE FILMES ---
function Home() {
  const [titulo, setTitulo] = useState('');
  const [listaFilmes, setListaFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [alerta, setAlerta] = useState({ msg: '', tipo: '' });

  const lidarComBusca = async () => {
    if (!titulo.trim()) {
      setAlerta({ msg: "Por favor, digite o título de um filme para pesquisar!", tipo: "erro" });
      return;
    }

    setCarregando(true);
    setAlerta({ msg: '', tipo: '' });

    const termoBuscaNormalizado = titulo.toLowerCase().trim();

    try {
      const url = `http://localhost:5000/filmes/busca_externa?titulo=${encodeURIComponent(termoBuscaNormalizado)}`;
      const resposta = await fetch(url);
      const dados = await resposta.json();
      
      if (!resposta.ok) {
        // Trata os erros enviados pelo Python (como o 404 de filme não localizado)
        setListaFilmes([]);
        setAlerta({ msg: dados.erro || "Filme não localizado no catálogo.", tipo: "erro" });
        return;
      }
      
      if (dados && dados.titulo) {
        const generoLimpo = dados.genero ? dados.genero.trim() : "";
        const generoTraduzido = MAPA_GENEROS[generoLimpo] || generoLimpo;
        
        setListaFilmes([{
          ...dados,
          genero: generoTraduzido
        }]);
      }
    } catch (erro) {
      console.warn("Back-end offline. Usando Fallback local.");
      const AcademyMock = {
        "matrix": { titulo: "Matrix", genero: "Ficção Científica", ano: "1999" },
        "avatar": { titulo: "Avatar", genero: "Ficção Científica", ano: "2009" }
      };
      
      if (AcademyMock[termoBuscaNormalizado]) {
        setListaFilmes([AcademyMock[termoBuscaNormalizado]]);
      } else {
        setListaFilmes([]);
        setAlerta({ msg: "Filme não localizado no banco de dados local temporário.", tipo: "erro" });
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section className="secao ativa">
      <h2>Controle de Busca de Filmes</h2>
      <AlertaSistema mensagem={alerta.msg} tipo={alerta.tipo} />
      
      <div className="formulario">
        <h3>Pesquisar Filme</h3>
        <input 
          placeholder="Título do filme (Ex: matrix, avatar)" 
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TooltipExplicativa texto="O sistema aceita letras maiúsculas ou minúsculas normalmente." />
        <BotaoCinema texto={carregando ? "Buscando..." : "Buscar"} onClick={lidarComBusca} />
      </div>

      <h3>Lista de Filmes</h3>
      {carregando && <p style={{ color: 'var(--azul-neon)' }}>🔄 Carregando dados do catálogo...</p>}
      
      {!carregando && listaFilmes.length === 0 ? (
        <div className="lista-cards">Nenhum filme encontrado ou listado ainda.</div>
      ) : (
        <div className="lista-cards">
          {listaFilmes.map((filme, index) => (
            <CardItem 
              key={index}
              titulo={filme.titulo}
              info1={<span><strong>Gênero:</strong> {filme.genero}</span>}
              info2={<span><strong>Ano:</strong> {filme.ano}</span>}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// --- PÁGINA 2: GERENCIAMENTO DE CLIENTES ---
function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState(''); 
  const [idClienteEdicao, setIdClienteEdicao] = useState(null);
  
  const [listaClientes, setListaClientes] = useState(() => {
    const salvosLocalmente = localStorage.getItem('mvp_clientes_cache');
    return salvosLocalmente ? JSON.parse(salvosLocalmente) : [];
  });
  
  const [carregando, setCarregando] = useState(false);
  const [alerta, setAlerta] = useState({ msg: '', tipo: '' });

  const buscarClientesDoBanco = async () => {
    try {
      const resposta = await fetch('http://localhost:5000/clientes');
      if (resposta.ok) {
        const dados = await resposta.json();
        setListaClientes(dados);
        localStorage.setItem('mvp_clientes_cache', JSON.stringify(dados));
      }
    } catch (erro) {
      console.log("Usando base de dados local temporária em cache (Mock).");
    }
  };

  useEffect(() => {
    buscarClientesDoBanco();
  }, []);

  const validarMaioridade = (dataString) => {
    if (!dataString || dataString.length !== 10) return "data_invalida";

    const partes = dataString.split('/');
    if (partes.length !== 3) return "data_invalida";

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; 
    const ano = parseInt(partes[2], 10);

    const dataNasc = new Date(ano, mes, dia);
    const dataAtual = new Date(); 

    if (dataNasc.getFullYear() !== ano || dataNasc.getMonth() !== mes || dataNasc.getDate() !== dia) {
      return "data_invalida";
    }

    let idadeCalculada = dataAtual.getFullYear() - dataNasc.getFullYear();
    const diferencaMeses = dataAtual.getMonth() - dataNasc.getMonth();
    
    if (diferencaMeses < 0 || (diferencaMeses === 0 && dataAtual.getDate() < dataNasc.getDate())) {
      idadeCalculada--;
    }

    return idadeCalculada >= 18;
  };

  const lidarComEnvioFormulario = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setAlerta({ msg: '', tipo: '' });

    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setAlerta({ msg: "Erro: O CPF deve conter exatamente 11 dígitos numéricos.", tipo: "erro" });
      setCarregando(false);
      return;
    }

    const resultadoMaioridade = validarMaioridade(dataNascimento);
    
    if (resultadoMaioridade === "data_invalida") {
      setAlerta({ msg: "Erro: Por favor, digite a data completa no formato DD/MM/AAAA (Ex: 15/04/1990).", tipo: "erro" });
      setCarregando(false);
      return;
    }
    
    if (!resultadoMaioridade) {
      setAlerta({ msg: "Regra de Negócio: O cliente deve ter 18 anos ou mais para se cadastrar.", tipo: "erro" });
      setCarregando(false);
      return;
    }

    const partes = dataNascimento.split('/');
    const dataFormatadaParaBanco = `${partes[2]}-${partes[1]}-${partes[0]}`;

    const dadosCliente = {
      nome: nome,
      cpf: cpfLimpo,
      email: email,
      telefone: telefone, 
      data_nascimento: dataFormatadaParaBanco
    };

    try {
      const url = idClienteEdicao ? `http://localhost:5000/clientes/${idClienteEdicao}` : 'http://localhost:5000/clientes';
      const metodo = idClienteEdicao ? 'PUT' : 'POST';

      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCliente)
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        setAlerta({ msg: idClienteEdicao ? "Cliente atualizado com sucesso!" : "Cadastro realizado com sucesso!", tipo: "sucesso" });
        limparCampos();
        buscarClientesDoBanco();
      } else {
        setAlerta({ msg: `Erro do Servidor: ${resultado.erro || 'Falha na operação'}`, tipo: "erro" });
      }
    } catch (erro) {
      if (idClienteEdicao) {
        const listaAtualizada = listaClientes.map(cliente => {
          if (cliente.id === idClienteEdicao) {
            return { ...cliente, ...dadosCliente, data_nascimento: dataNascimento };
          }
          return cliente;
        });
        setListaClientes(listaAtualizada);
        localStorage.setItem('mvp_clientes_cache', JSON.stringify(listaAtualizada));
        setAlerta({ msg: "Cliente atualizado com sucesso (Simulação Local)!", tipo: "sucesso" });
      } else {
        const mockNovo = { id: Date.now(), ...dadosCliente, data_nascimento: dataNascimento };
        const novaLista = [...listaClientes, mockNovo];
        setListaClientes(novaLista);
        localStorage.setItem('mvp_clientes_cache', JSON.stringify(novaLista));
        setAlerta({ msg: "Cadastro realizado com sucesso!", tipo: "sucesso" });
      }
      limparCampos();
    } finally {
      setCarregando(false);
    }
  };

  const lidarComDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este cliente?")) return;
    try {
      const resposta = await fetch(`http://localhost:5000/clientes/${id}`, { method: 'DELETE' });
      if (resposta.ok) {
        setAlerta({ msg: "Cliente removido com sucesso!", tipo: "sucesso" });
        buscarClientesDoBanco();
      }
    } catch (erro) {
      const filtrados = listaClientes.filter(c => c.id !== id);
      setListaClientes(filtrados);
      localStorage.setItem('mvp_clientes_cache', JSON.stringify(filtrados));
      setAlerta({ msg: "Removido localmente no modo simulação!", tipo: "sucesso" });
    }
  };

  const prepararEdicao = (cliente) => {
    setIdClienteEdicao(cliente.id);
    setNome(cliente.nome);
    setEmail(cliente.email || '');
    setTelefone(cliente.telefone || '');
    
    let vCpf = cliente.cpf.replace(/\D/g, '');
    if (vCpf.length === 11) {
      vCpf = vCpf.slice(0, 3) + '.' + vCpf.slice(3, 6) + '.' + vCpf.slice(6, 9) + '-' + vCpf.slice(9);
    }
    setCpf(vCpf);
    
    if (cliente.data_nascimento && cliente.data_nascimento.includes('-')) {
      const p = cliente.data_nascimento.split('-');
      setDataNascimento(`${p[2]}/${p[1]}/${p[0]}`);
    } else {
      setDataNascimento(cliente.data_nascimento || '');
    }
  };

  const limparCampos = () => {
    setNome(''); setEmail(''); setTelefone(''); setCpf(''); setDataNascimento('');
    setIdClienteEdicao(null);
  };

  return (
    <section className="secao ativa">
      <h2>Gerenciar Clientes</h2>
      <AlertaSistema mensagem={alerta.msg} tipo={alerta.tipo} />
      
      <form className="formulario" onSubmit={lidarComEnvioFormulario} autoComplete="off">
        <h3>{idClienteEdicao ? "✏️ Editar Dados" : "👥 Cadastrar Novo Cliente"}</h3>
        <input placeholder="Nome Completo *" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <input 
          type="tel" 
          placeholder="Telefone (DDD + Número)" 
          maxLength="15" 
          value={telefone}
          onChange={(e) => {
            let digitos = e.target.value.replace(/\D/g, '');
            if (digitos.length > 0) digitos = '(' + digitos;
            if (digitos.length > 3) digitos = digitos.slice(0, 3) + ') ' + digitos.slice(3);
            if (digitos.length > 9) {
              if (digitos.replace(/\D/g, '').length === 11) {
                digitos = digitos.slice(0, 10) + '-' + digitos.slice(10);
              } else {
                digitos = digitos.slice(0, 9) + '-' + digitos.slice(9);
              }
            }
            setTelefone(digitos);
          }}
        />

        <input 
          placeholder="CPF (apenas números) *" 
          maxLength="14" 
          value={cpf} 
          onChange={(e) => {
            let digitos = e.target.value.replace(/\D/g, '');
            if (digitos.length > 3) digitos = digitos.slice(0, 3) + '.' + digitos.slice(3);
            if (digitos.length > 7) digitos = digitos.slice(0, 7) + '.' + digitos.slice(7);
            if (digitos.length > 11) digitos = digitos.slice(0, 11) + '-' + digitos.slice(11);
            setCpf(digitos);
          }} 
          required 
          disabled={idClienteEdicao !== null} 
          autoComplete="one-time-code"
        />
        
        <input 
          type="text"
          placeholder="Data de Nascimento (DD/MM/AAAA) *" 
          maxLength="10"
          value={dataNascimento} 
          onChange={(e) => {
            let digitos = e.target.value.replace(/\D/g, ''); 
            if (digitos.length > 2) {
              digitos = digitos.slice(0, 2) + '/' + digitos.slice(2);
            }
            if (digitos.length > 5) {
              digitos = digitos.slice(0, 5) + '/' + digitos.slice(5);
            }
            setDataNascimento(digitos);
          }} 
          required 
        />
        <TooltipExplicativa texto="Restrição de regras de negócio: O sistema rejeitará menores de 18 anos." />

        <div className="botoes-acao">
          <BotaoCinema type="submit" texto={idClienteEdicao ? "Salvar Alterações" : "Cadastrar"} />
          <BotaoCinema type="button" classeExtra="btn-limpar" texto="Cancelar" onClick={limparCampos} />
        </div>
      </form>

      <div className="area-listagem-clientes">
        <h3>Lista de Clientes Cadastrados</h3>
        <div className="lista-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '15px' }}>
          {listaClientes.map((cliente) => {
            let dataExibicao = cliente.data_nascimento;
            if (dataExibicao && dataExibicao.includes('-')) {
              const p = dataExibicao.split('-');
              dataExibicao = `${p[2]}/${p[1]}/${p[0]}`;
            }
            return (
              <CardItem 
                key={cliente.id}
                titulo={cliente.nome}
                info1={<span><strong>CPF:</strong> {cliente.cpf}</span>}
                info2={<span><strong>Email:</strong> {cliente.email || 'N/A'}</span>}
                info3={<span><strong>Telefone:</strong> {cliente.telefone || 'N/A'}</span>}
                info4={<span><strong>Nascimento:</strong> {dataExibicao}</span>}
                botoesAcao={
                  <>
                    <button className="btn" style={{ padding: '5px 10px', fontSize: '0.8rem', background: '#e0a905', border: 'none' }} onClick={() => prepararEdicao(cliente)}>✏️ Editar</button>
                    <button className="btn btn-limpar" style={{ padding: '5px 10px', fontSize: '0.8rem', background: '#d9534f' }} onClick={() => lidarComDeletar(cliente.id)}>❌ Excluir</button>
                    <button className="btn" style={{ padding: '5px 10px', fontSize: '0.8rem', background: '#05a6e0', border: 'none' }} onClick={() => navigate(`/perfil/${cliente.id}`)}>👤 Ver ID</button>
                  </>
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- PÁGINA 3: VISUALIZADOR DE PERFIL / ID DO CLIENTE ---
function PerfilCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <section className="secao ativa" style={{ textAlign: 'center', paddingBottom: '80px' }}>
      <h2>Visualizador de Parâmetro de Rota</h2>
      <div className="card-filme" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid var(--azul-neon)' }}>
        <p>Você acessou o perfil dinâmico do cliente.</p>
        <h3 style={{ color: 'var(--azul-neon)' }}>ID Capturado via URL: {id}</h3>
      </div>
      
      <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', background: 'rgba(10, 10, 15, 0.95)', borderTop: '1px solid var(--azul-neon)', padding: '15px 0', display: 'flex', justifyContent: 'center', zIndex: '999', boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.5)' }}>
        <BotaoCinema 
          texto="Voltar para Cadastro" 
          onClick={() => navigate('/cadastro')} 
          style={{ width: '90%', maxWidth: '350px' }} 
        />
      </div>
    </section>
  );
}

function Pagina404() {
  return (
    <section className="secao ativa" style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--azul-neon)', margin: '0' }}>404</h1>
      <h2>Cena Cortada! Página Não Encontrada</h2>
      <p>O filme ou link que você tentou acessar não está listado no nosso roteiro.</p>
      <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>Voltar para o Início</Link>
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
          <Route path="/perfil/:id" element={<PerfilCliente />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </main>
    </Router>
  );
}