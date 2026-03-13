# Venore — Core Auth

Implementação do sistema base de autenticação do **Venore**, utilizando:

- Next.js (App Router)
- Auth.js v5
- PostgreSQL
- Drizzle ORM

Este documento registra o escopo implementado no módulo **Core Auth**, incluindo banco de dados, integração com Auth.js e proteção de rotas.

---

# 1. Objetivo

Criar a base de autenticação do Venore com:

- usuários persistidos em banco
- sessões em banco
- login via OAuth (GitHub inicialmente)
- base preparada para múltiplos providers
- arquitetura compatível com expansão futura (roles, permissões, magic link etc.)

---

# 2. Stack utilizada

| Tecnologia            | Função                          |
| --------------------- | ------------------------------- |
| Next.js (App Router)  | Framework principal             |
| Auth.js v5            | Sistema de autenticação         |
| PostgreSQL            | Banco de dados                  |
| Drizzle ORM           | ORM e migrations                |
| @auth/drizzle-adapter | Adapter entre Auth.js e Drizzle |

---

# 3. Estrutura de diretórios

Estrutura relevante para o Core Auth:

src/
├ db/
│ ├ index.ts
│ ├ schema/
│ │ ├ auth.ts
│ │ └ index.ts
│ └ migrations/
│
├ core/
│ └ auth/
│ ├ index.ts
│ ├ config.ts
│ ├ providers.ts
│ ├ current-user.ts
│ └ actions/
│ └ sign-out.ts
│
├ app/
│ └ api/
│ └ auth/
│ └ [...nextauth]/
│ └ route.ts
│
├ types/
│ └ next-auth.d.ts
│
└ proxy.ts

---

# 4. Banco de dados

## Conexão

Arquivo:

src/db/index.ts

Responsável por criar a instância do Drizzle.

---

## Schema de autenticação

Arquivo:

src/db/schema/auth.ts

Tabelas criadas:

### users

Tabela principal de usuários.

Campos principais:

- id
- name
- email
- emailVerified
- image
- createdAt
- updatedAt

---

### accounts

Contas vinculadas a providers OAuth.

Campos:

- userId
- provider
- providerAccountId
- access_token
- refresh_token
- expires_at
- scope
- token_type
- id_token
- session_state

---

### sessions

Sessões persistidas em banco.

Campos:

- sessionToken
- userId
- expires
- createdAt
- updatedAt

---

### verification_tokens

Tokens para verificação de e-mail ou magic link.

Campos:

- identifier
- token
- expires

---

## Migrations

Migrations geradas via:

npm run db:generate  
npm run db:migrate

Tabela de controle criada:

drizzle.\_\_drizzle_migrations

---

# 5. Configuração do Auth.js

## Arquivo principal

src/core/auth/index.ts

Inicializa o Auth.js:

import NextAuth from "next-auth";
import { authConfig } from "./config";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

Exports utilizados pelo sistema:

- handlers
- auth
- signIn
- signOut

---

## Configuração

Arquivo:

src/core/auth/config.ts

Responsável por:

- configurar adapter
- definir estratégia de sessão
- registrar providers
- callbacks de sessão

Sessão utilizada:

strategy: "database"

---

## Adapter

Adapter utilizado:

@auth/drizzle-adapter

Mapeamento das tabelas:

- users
- accounts
- sessions
- verificationTokens

---

# 6. Providers

Arquivo:

src/core/auth/providers.ts

Provider inicial implementado:

GitHub OAuth

Variáveis de ambiente necessárias:

AUTH_GITHUB_ID  
AUTH_GITHUB_SECRET

Callback configurado:

/api/auth/callback/github

---

# 7. Route Handler

Arquivo:

src/app/api/auth/[...nextauth]/route.ts

Exposição da API do Auth.js.

import { handlers } from "@/core/auth";

export const { GET, POST } = handlers;

Rotas internas utilizadas:

/api/auth/signin  
/api/auth/signout  
/api/auth/callback/github  
/api/auth/session

---

# 8. Proteção de rotas

Proteção feita via:

src/proxy.ts

Utilizando integração direta com Auth.js.

Exemplo de matcher:

/dashboard/_  
/account/_  
/profile/_  
/notifications/_  
/portal/_  
/admin/_

Observação:

Route groups como `(private)` **não aparecem na URL**, então o proxy protege os caminhos reais.

---

# 9. Helpers do Core

## current-user

Arquivo:

src/core/auth/current-user.ts

Responsável por obter o usuário atual.

const session = await auth();

Retorna:

session?.user

---

## sign-out action

Arquivo:

src/core/auth/actions/sign-out.ts

Server Action para logout.

Utiliza:

signOut()

com redirecionamento para `/login`.

---

# 10. Tipagem do NextAuth

Arquivo:

src/types/next-auth.d.ts

Extensão da interface `Session` para incluir:

session.user.id

Estrutura:

Session {
user: {
id
name
email
image
}
}

---

# 11. Variáveis de ambiente

Variáveis utilizadas:

DATABASE_URL  
AUTH_SECRET  
AUTH_URL

AUTH_GITHUB_ID  
AUTH_GITHUB_SECRET

---

# 12. Status do Core Auth

O módulo **Core Auth está funcional e completo**.

Inclui:

✔ Banco PostgreSQL configurado  
✔ Drizzle ORM configurado  
✔ Migrations aplicadas  
✔ Schema de autenticação  
✔ Adapter Auth.js + Drizzle  
✔ OAuth GitHub funcionando  
✔ Sessões persistidas em banco  
✔ Proxy de proteção de rotas  
✔ Helpers básicos de sessão

---

# 13. Próximos módulos (fora deste escopo)

A evolução natural do sistema inclui:

### Core Users

- profiles
- roles
- user_settings

### Core Permissions

- RBAC
- ACL

### Providers adicionais

- Google
- Microsoft

### Autenticação por e-mail

- Magic link

### Segurança

- rate limiting
- audit logs
- login attempts

---

# 14. Conclusão

O **Core Auth do Venore está estabelecido como fundação da arquitetura**.

Ele fornece:

- autenticação padronizada
- sessões persistidas
- integração com providers OAuth
- base para expansão futura do sistema de usuários e permissões.
