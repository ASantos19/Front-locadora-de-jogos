# Locadora de Jogos

Front-end de uma aplicação de locadora de jogos, desenvolvido com Angular. O sistema permite que usuários criem uma conta, façam login, consultem o catálogo e comprem ou aluguem jogos.

## Funcionalidades

- Cadastro e login de usuários
- Autenticação com token JWT
- Catálogo de jogos com paginação
- Compra e aluguel de jogos
- Listagem dos jogos do usuário
- Visualização e edição do perfil
- Gerenciamento de jogos para administradores

## Tecnologias

- Angular 21
- TypeScript
- Angular Material
- RxJS
- Express e Angular SSR
- Vitest

## Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/)
- npm
- Back-end da aplicação em execução na porta `8080`

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd Front-locadora-de-jogos-main
```

Instale as dependências:

```bash
npm install
```

## Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

O front-end está configurado para consumir a API em `http://localhost:8080`.

## Outros comandos

```bash
# Gerar a versão de produção
npm run build

# Executar os testes
npm test

# Compilar automaticamente durante o desenvolvimento
npm run watch
```

## Rotas principais

- `/login` — autenticação
- `/cadastro` — criação de conta
- `/jogos` — catálogo de jogos
- `/meus-jogos` — jogos comprados ou alugados
- `/perfil` — dados do usuário

## Autor

Projeto desenvolvido para fins de estudo.
