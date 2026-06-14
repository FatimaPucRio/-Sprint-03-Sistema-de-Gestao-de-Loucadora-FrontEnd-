# 🎬 Sistema de Gestão de Locadora — Front-End 

Projeto de interface front-end desenvolvido como MVP para a disciplina de Desenvolvimento Front-end Avançado da PUC-Rio.

## 🎯 Objetivo

Demonstrar a implementação de uma Single Page Application (SPA) robusta, capaz de integrar regras de negócio complexas, consumo de serviços assíncronos e uma experiência de usuário responsiva. O front-end atua como a camada de inteligência do lado do cliente, gerenciando estados, rotas e a comunicação segura com o servidor.

## 🛠️ Tecnologias Utilizadas

* React.js: Framework principal para a construção da interface baseada em componentes.

* React Router Dom: Gerenciamento de rotas para navegação SPA (Home, Filmes, Clientes, Perfil Dinâmico).

* Fetch API: Realização de requisições assíncronas para comunicação com o Back-end.

* LocalStorage: Camada de persistência local para cache de dados e fallback em caso de indisponibilidade do servidor.

* CSS Customizado: Estilização baseada em variáveis CSS para uma interface com temática neon.

## 🏗️ Comportamento da Aplicação

O front-end foi projetado para atuar como um cliente autônomo, garantindo:

* Gerenciamento de Estado: Utilização de useState e useEffect para controle em tempo real da interface, incluindo feedback de carregamento (loading) e alertas de sistema.

* Validação de Regras de Negócio: Implementação de lógicas de validação rigorosas no lado do cliente, como a verificação de maioridade (18+ anos) para cadastros e formatação/máscara de campos (CPF, Telefone, Data).

* Resiliência (Graceful Degradation): O sistema possui um mecanismo de fallback. Caso o Back-end esteja offline, a aplicação utiliza dados simulados (Mocks) e o localStorage para manter a funcionalidade de cadastro disponível localmente.

* **Roteamento Dinâmico: Utilização de parâmetros de rota (useParams) e navegação programática (useNavigate) para criar experiências de perfil individualizadas sem recarregamento de página.

## 🚀 Como Executar

Inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev
