Bem-vinde ao projeto My Contacts - Fullstack App!

## Introdução

<p> Este projeto é constituído de frontend e backend para gestão de uma lista de contatos. Esse README é a documentação oficial.</p>

## Funcionalidades
A aplicação permite:
- O cadastro de sua própria conta, com os dados: nome, sobrenome, telefone, email, senha.
- Editar seus próprios dados e também excluir a conta.
- Cadastrar contatos, com os dados: nome, sobrenome, telefone, email.
- Editar e também excuir contatos.
- Buscar por um contato em especídifo.
- Buscar por todos os contatos da lista.
- Login com Autologin.

## Tecnologias
- TypeScript
- Node
- Express
- Type ORM
- PostgreSQL
- Zod
- Bcrypt
- JWT
- React
- Axios
- Styled Components
- React Icons
- React Toastify

## Instalação e Execução

## Instalação e Execução
É necessário ter instalado em sua máquina o `Node` e o gerenciador de pacotes `npm`.
Para executar a aplicação localmente, siga estas etapas:

1. Clone este repositório.
2. Abra o repositório no vscode. Abra um terminal na pasta front, abra um terminal na pasta back e abra um terminal para o postgreSQL.
3. No terminal back rode os comandos:
  - `npm install`
  - `npm install express ts-node-dev typescript typeorm reflect-metadata pg express-async-errors zod bcryptjs dotenv jsonwebtoken`
  - `npm install -D @types/node @types/express @types/jsonwebtoken @types/bcryptjs`
4. No terminal front rode os comandos:
  - `npm install`
  - `npm install react-hook-form @hookform/resolvers react-router-dom zod axios styled-components react-icons --save react-toastify`
  - `npm install -D @types/styled-components`
5. No terminal para o PostgreSQL, digite psql, faça o login e crie um banco de dados (CREATE DATABASE [nome do banco];).
6. Configure as credenciais de acesso num novo arquivo `.env`, seguindo o exemplo em .env.example. Em /db, substituia por /[nome do banco].
7. No terminal back, rode o comando para migrações: `npm run typeorm migration:run -- -d src/data-source`
8. No terminal back e no terminal front, respectivamente, rode o comando `npm run dev`.
9. No terminal front, clique no link para abrir a aplicação no navegador.

Ps.: 8. Se desejar fazer testes do CRUD apenas no back, utilize o workspace do Insomnia que disponibilizei no repositório, basta importar.

## Rotas da API
Há um total de 10 endpoints: login, CRUD de user, CRUD de contato. Especificações abaixo.

- Criação de conta

Rota sem autenticação, cria a conta da pessoa usuária. É obrigatório nome, sobrenome, telefone, email e senha.

`POST /user - FORMATO DA REQUISIÇÃO`
```
{
	"firstName": "Alec",
	"lastName": "Volt",
	"phone": "(99) 99999-9999",
	"email": "alec@mail.com",
	"password":"123"
}
```
Sendo bem sucedida:

`POST /user - FORMATO DA RESPOSTA - 201`
```
{
	"id": 23,
	"firstName": "Alec",
	"lastName": "Volt",
	"phone": "(99) 99999-9999",
	"email": "alec@mail.com",
	"createdAt": "2023-08-06"
}
```
- Login

Rota sem autenticação, faz o login via email e senha. Uma vez feito, o token tem duração de 2hs e no front há a funcionalidade de autologin.

`POST /user - FORMATO DA REQUISIÇÃO`
```
{
	"email": "alec@mail.com",
	"password": "123"
}
```
Sendo bem sucedida:

`POST /user - FORMATO DA RESPOSTA - 200`

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
}
```
- Listagem da pessoa logada

Rota com autenticação, lista todos os dados da pessoa logada.

`GET /user - FORMATO DA REQUISIÇÃO (SEM CORPO)`

Sendo bem sucedida retorna a mesma resposta que a requisição `POST /user`

- Atualização de dados da pessoa logada

Rota com autenticação, atualizando quaisquer dados que se desejar atualizar. Quaisquer campos podem ser atualizados.

`PATCH /user - FORMATO DA REQUISIÇÃO`
```
{
	"email": "alecvolt1234@mail.com",
}
```
Sendo bem sucedida:

`PATCH /user - FORMATO DA RESPOSTA - 200`
```
{
	"id": 23,
	"firstName": "Alec",
	"lastName": "Volt",
	"phone": "(99) 99999-9999",
	"email": "alecvolt1234@mail.com",
	"createdAt": "2023-08-06"
}
```
- Deleção da própria conta

Rota com autenticação, deleta a conta da pessoa logada.

`DELETE /user - FORMATO DA REQUISIÇÃO (SEM CORPO)`

Sendo bem sucedida retorna o status `204`. No front há o redirecionamento para a página raiz, página de login (e criação de conta).

- Criação de contato
  
Rota com autenticação, cria um contato vinculado a pessoa logada. É obrigatório nome, sobrenome/referência, telefone, e email. Não será possível criar um novo contato caso já exista algum na lista com o mesmo email ou telefone, será retornado o status `409`.

`POST /contact - FORMATO DA REQUISIÇÃO`
```
{
	"firstName": "Demi",
	"lastName": "Volt",
	"phone": "(99) 99999-9998",
	"email": "demi@mail.com"
}
```
Sendo bem sucedida:

`POST /contact - FORMATO DA RESPOSTA - 201`
```
{
	"id": 34,
	"firstName": "Demi",
	"lastName": "Volt",
	"phone": "(99) 99999-9998",
	"email": "demi@mail.com",
	"createdAt": "2023-08-06"
}
```
- Listagem de todos os contatos

Rota com autenticação, lista todos os contatos da pessoa logada.

`GET /contact - FORMATO DA REQUISIÇÃO`

`GET /contact - FORMATO DA RESPOSTA - 200`
```
[
  {
  	"id": 34,
  	"firstName": "Demi",
  	"lastName": "Volt",
  	"phone": "(99) 99999-9998",
  	"email": "demi@mail.com",
  	"createdAt": "2023-08-06"
  },
  ...
]
```

- Listagem de um contato

Rota com autenticação, lista todos os dados de um contato existente. Caso não exista um contato com a id buscada é retornado o status `404` com uma mensagem de erro. No front essa rota não foi utilizada, tendo em vista que na dashboard sõa renderizados todos os contatos da lista e a busca de um específico é feita via filtro, por qualquer dado do contato.

`GET /contact/:id - FORMATO DA REQUISIÇÃO`

`GET /contact/34 - FORMATO DA RESPOSTA - 200`
```
{
	"id": 34,
	"firstName": "Demi",
	"lastName": "Volt",
	"phone": "(99) 99999-9998",
	"email": "demi@mail.com",
	"createdAt": "2023-08-06"
}
```
- Atualização de um contato

Rota com autenticação, atualizando quaisquer dados que se desejar atualizar de um determinado contato. Caso não exista um contato com a id buscada é retornado o status `404` com uma mensagem de erro

`PATCH /contact/34 - FORMATO DA REQUISIÇÃO`
```
{
	"firstName": "Demitri",
	"lastName": "Volty"
}
```
Sendo bem sucedida:

`PATCH /contact/34 - FORMATO DA RESPOSTA - 200`
```
{
	"id": 34,
	"firstName": "Demitri",
	"lastName": "Volty",
	"phone": "(99) 99999-9998",
	"email": "demiv@mail.com",
	"createdAt": "2023-08-06"
}
```
- Deleção de um contato

Rota com autenticação, deleta o contato que for indicado via id.

`DELETE /contact/34 - FORMATO DA REQUISIÇÃO (SEM CORPO)`

Sendo bem sucedida retorna o status `204`.

_______________________________________________
Essa documentação e esse repositório foram criados por mim, Julles. 
Para qualquer interação, entre em contato comigo [aqui](https://www.linkedin.com/in/julleskuhn/).
