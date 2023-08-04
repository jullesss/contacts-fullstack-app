Bem-vinde ao projeto My Contacts - Fullstack App!

## Introdução

<p> Este projeto é constituído de frontend e backend para gestão de uma lista de contatos.</p>

## Funcionalidades
A aplicação permite:
- O cadastro de sua própria conta, com os dados: nome, sobrenome, telefone, email, senha.
- Editar seus próprios dados e também excluir a conta.
- Cadastrar contatos, com os dados: nome, sobrenome, telefone, email.
- Editar e também excuir contatos.
- Buscar por um contato em especídifo.
- Buscar por todos os contatos da lista.
- Login com Autologin.

## Instalação e Execução

Para executar a aplicação localmente, siga estas etapas:

1. Clone este repositório.
2. Abra o repositório no vscode. Abra um terminal na pasta front, abra um terminal na pasta back e abra um terminal para o postgreSQL.
Obs.: usaremos o pacote `npm`.
3. No terminal back rode os comandos:
  - `npm install express ts-node-dev typescript typeorm reflect-metadata pg express-async-errors zod bcryptjs dotenv jsonwebtoken`
  - `npm install -D @types/node @types/express @types/jsonwebtoken @types/bcryptjs`
4. No terminal front rode os comandos:
  - `npm install react-hook-form @hookform/resolvers react-router-dom zod axios styled-components react-icons --save`
  - `npm install -D @types/styled-components`
5. No terminal para o postgreSQL, digite psql, faça o login e crie um banco de dados (CREATE DATABASE [nome do banco];).
6. Configure as credenciais de acesso num novo arquivo `.env`, seguindo o exemplo em .env.example. Em /db, substituia por /[nome do banco].
7. No terminal back, rode o comando para migrações: `npm run typeorm migration:run -- -d src/data-source`
8. Se desejar, utilize o nosso workspace do Insomnia para testes. Ele se encontra em nosso repositório, basta importar.
9. No terminal back e no pasta terminal front, respectivamente, rode o comando `npm run dev`.
10. No terminal front, clique no link para abrir a aplicação no navegador.
