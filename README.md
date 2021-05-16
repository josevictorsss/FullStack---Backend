# Labefy Musics - Backend

## :memo: Funcionalidades

- Signup
- Login
- Adicionar nova música
- Criação de playlist
- Adicionar música a playlist
- Músicas do usuário
- Músicas da playlist
- Playlists do usuário
- Música por ID
- Remoção de música

## 💻 Documentação

Teste as rotas com a documentação, basta importar ela para seu postman.

[Postman - Labefy Músics](https://documenter.getpostman.com/view/14145831/TzRVg7Kq)

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node
- Express
- Typescript
- Cors
- Knex
- MySQL
- Jest
- Dotenv
- Jsonwebtoken
- Nodemailer
- Handlebars
- Dayjs

## 🚀 Como executar

- Instale as dependências com

```
npm install
```

- Crie um arquivo .env

```
touch .env
```

- Preencha o arquivo .env

```
DB_HOST = Coloque aqui seu endereço do banco de dados
DB_USER = Coloque aqui seu usuário
DB_PASSWORD = Coloque aqui sua senha
DB_SCHEMA = Coloque aqui o nome do banco de dados
JWT_KEY = Coloque aqui sua chave(aleatório)
ACCESS_TOKEN_EXPIRES_IN = Coloque aqui o tempo que expira sua chave.
BCRYPT_COST = Coloque aqui um valor(O valor padrão é 12)
```

- Crie as tabelas com

```
npm run migrations
```

- Popularize a tabela de gêneros com

```
npm run populate
```

- Inicie o servidor com

```
npm run dev
```

- Realize os testes com

```
npm run test
```

## Desenvolvido por:

- [José Victor](https://www.linkedin.com/in/jose-victor-tf/)
