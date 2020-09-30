
# [API] Proffy

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)]()

Esta API tem por finalidade fornecer dados para os front-ends web e mobile.

Permite cadastrar a disponibilidade de turmas e disciplinas, além de contar o número de professores conectados aos usuários.

O app possui validação e um simples versionamento.

## Índice

- [Instalação](#Instalação)

- [Banco de Dados](#Database)

- [Como Rodar](#Rodando)

- [Rotas](#Rotas)

# Instalação

```
yarn
```

Or:

```
npm install
```

# Database

Foi utilizado o banco de dados [SQLite](https://www.sqlite.org/index.html).

Para obter mais informações sobre como configurar seu banco de dados, consulte: [knexfile.ts](http://knexjs.org/#knexfile)

Rodando as migrations:

```
yarn knex:migrate
```

Or:

```
npx knex migrate:latest
```

> Mais informações em [Knex Migrations](http://knexjs.org/#Migrations).

O arquivo `.env` deve ser configurado conforme o `.env.example`.

|key|description|default
|---|---|---
|APP_PORT|Port number where the app will run.|`3333`

# Rodando

Inicie o servidor com:

```
yarn dev:server
```

Or:

```
npm run dev:server
```

Foi utilizado um simples versionamento. Apenas lembre-se de definir após o `host` a string `/v1/` para suas solicitações.

```
GET http://localhost:3333/v1/classes
```

# Rotas

|rota|Método HTTP|Parâmetros|Descrição
|:---|:---:|:---:|:---:
|`/connections`|GET|`week_day`, `from` and `to` query parameters.|Lista todas as conexões.
|`/connections`|POST|Body with `user_id`.|Aumente o número de conexões.
|`/classes`|GET|`page` query parameter.|Lista as aulas disponíveis.
|`/classes`|POST|Body with class `subject`, `cost`, user `name`, `avatar`, `whatsapp`, `bio` and class schedule `schedule.week_day`, `schedule.from`, `schedule.to`.|Criar nova disponibilidade de aula.
