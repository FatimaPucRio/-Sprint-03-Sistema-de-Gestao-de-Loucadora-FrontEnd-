# 🎬 Sistema de Gestão de Locadora - Front-End 

Projeto de interface front-end desenvolvido como MVP para a disciplina de Desenvolvimento Front-end Avançado da PUC-Rio.

## 🎯 Objetivo

Demonstrar a implementação de uma Single Page Application (SPA) desenvolvida para o Sistema de Gestão de Locadora, focada na integração de funcionalidades de cadastro e consulta, atuando como:

* Gerenciamento de Clientes: Interface completa para realizar o cadastro, consulta, edição e exclusão de clientes, com validações de dados diretamente na interface.

* Consulta ao Catálogo: Integração com serviços externos para realizar a busca dinâmica de filmes, permitindo a consulta de informações do acervo em tempo real.

* Camada de Inteligência: Gerenciamento centralizado de estados, navegação fluida entre rotas e a orquestração da comunicação com o servidor para persistência das informações.

## 🛠️ Tecnologias Utilizadas

* React.js: Framework principal para a construção da interface baseada em componentes.

* React Router Dom: Gerenciamento de rotas para navegação SPA (Home, Filmes, Clientes, Perfil Dinâmico).

* Fetch API: Realização de requisições assíncronas para comunicação com o Back-end.

* LocalStorage: Camada de persistência local para cache de dados e fallback em caso de indisponibilidade do servidor.

* CSS Customizado: Estilização baseada em variáveis CSS para uma interface com temática neon.

## 🏗️ Comportamento da Aplicação

Foi projetado para atuar como um cliente autônomo, garantindo:

* Gerenciamento de Estado: Utilização de useState e useEffect para controle em tempo real da interface, incluindo feedback de carregamento (loading) e alertas de sistema.

* Validação de Regras de Negócio: Implementação de lógicas de validação rigorosas no lado do cliente, como a verificação de maioridade (18+ anos) para cadastros e formatação/máscara de campos (CPF, Telefone, Data).

* Resiliência (Graceful Degradation): O sistema possui um mecanismo de fallback. Caso o Back-end esteja offline, a aplicação utiliza dados simulados (Mocks) e o localStorage para manter a funcionalidade de cadastro disponível localmente.

* Roteamento Dinâmico: Utilização de parâmetros de rota (useParams) e navegação programática (useNavigate) para criar experiências de perfil individualizadas sem recarregamento de página.

## 🚀 Como Executar

Para rodar o projeto corretamente, você precisará executar o back-end e o front-end em terminais separados:

1. Back-end (API e Swagger):

Certifique-se de que o seu servidor de API esteja rodando para que o Swagger esteja disponível. 

Execute no terminal:

```Bash
python app.py

Após iniciar, o Swagger estará acessível conforme configurado em seu app.py.

2. Front-end:

Inicie o servidor de desenvolvimento da interface:

npm run dev


