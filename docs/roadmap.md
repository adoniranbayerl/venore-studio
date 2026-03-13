# Venore — Development Roadmap

Este roadmap organiza o desenvolvimento do Venore em **fases progressivas**, começando pela fundação do sistema e avançando para CMS, módulos e recursos avançados.

---

# Phase 1 — Foundation (Infraestrutura)

Objetivo: preparar a base técnica do projeto.

- [x] Inicialização do projeto Next.js
- [x] Instalação das dependências principais
- [x] Configuração do Tailwind + shadcn
- [x] Estrutura de pastas do projeto
- [x] Arquitetura documentada (`architecture.md`)

### Infraestrutura de dados

- [x] Configuração do banco (PostgreSQL + Drizzle)
- [x] Estrutura inicial do schema
- [x] Sistema de migrations (Drizzle)
- [x] Configuração de variáveis de ambiente
- [x] Conexão com banco

### Estrutura da aplicação

- [x] Estrutura de route groups do App Router  
       `(public)`, `(auth)`, `(private)`, `admin`, `api`

Resultado esperado:

- projeto compila
- banco conectado
- migrations funcionando
- arquitetura base do sistema definida

---

# Phase 2 — Core Auth

Objetivo: implementar autenticação e identidade de usuário.

### Banco de dados

- [x] Tabela `users`
- [x] Tabela `accounts`
- [x] Tabela `sessions`
- [x] Tabela `verification_tokens`

### Auth.js

- [x] Configuração do Auth.js
- [x] Adapter Auth.js + Drizzle
- [x] Estratégia de sessão em banco (`database`)

### Providers

- [x] OAuth GitHub
- [ ] OAuth Google
- [ ] OAuth Microsoft
- [ ] Login com OTP por email (magic link)

### Infraestrutura de autenticação

- [x] Route handler `/api/auth/[...nextauth]`
- [x] Helpers de sessão (`current-user`)
- [x] Server action de logout
- [x] Tipagem do NextAuth (`next-auth.d.ts`)

### Proteção de rotas

- [x] proxy.ts para rotas privadas
- [x] Guards de autenticação

Resultado esperado:

- usuário consegue criar sessão
- login via GitHub funcionando
- sessões persistidas no banco
- rotas privadas protegidas

---

# Phase 3 — Permissions System

Objetivo: criar sistema de acesso baseado em **RBAC (Role Based Access Control)**.

### Modelagem de dados

- [x] Tabela `roles`
- [x] Tabela `permissions`
- [x] Tabela `role_permissions`
- [x] Tabela `user_roles`

Relacionamento:

User  
→ user_roles  
→ roles  
→ role_permissions  
→ permissions

---

### Seed inicial do sistema

Roles padrão:

- [x] `super-admin`
- [x] `admin`
- [x] `editor`
- [x] `user`

Permissões iniciais:

- [x] `users.read`
- [x] `users.write`
- [x] `pages.read`
- [x] `pages.write`
- [x] `pages.publish`

---

### Core Permissions

Estrutura criada:

```
src/core/permissions
```

Arquivos principais:

- [x] guards.ts
- [x] helpers.ts
- [x] roles.ts
- [x] permissions.ts
- [x] types.ts

---

### Helpers de autorização

- [x] `hasRole(user, role)`
- [x] `hasPermission(user, permission)`

---

### Guards server-side

- [x] `requireRole()`
- [x] `requirePermission()`

Permitem proteger:

- server actions
- rotas administrativas
- lógica de domínio

---

### Integração com sessão

Sessão do usuário pode expor:

```
user.roles
user.permissions
```

Helper criado:

```
getCurrentUser()
```

---

### UI Permission Gate

Componente criado:

```
PermissionGate
```

Exemplo:

```
<PermissionGate permission="users.write">
  <Button>Editar</Button>
</PermissionGate>
```

---

### Regras de segurança

Foi implementada a regra:

**Sempre deve existir pelo menos um `super-admin`.**

O sistema impede:

- remover o último super-admin
- rebaixar o último super-admin
- excluir o último super-admin

---

### Integração com Admin

Base criada:

```
/admin/users
```

Funcionalidades iniciais:

- listagem de usuários
- alteração de roles
- validação de super-admin

---

# Phase 4 — Layout System

Objetivo: criar o layout base da aplicação.

- [x] App Shell
- [x] Site Header
- [x] Page Header
- [x] Sidebar principal
- [x] Sidebar contextual
- [x] Footer
- [x] Breadcrumbs

Integrações:

- navegação
- permissões
- contexto do usuário

---

# Navigation System (Infraestrutura)

Antes da expansão do admin e dos plugins será criado o **Navigation Registry**.

Objetivo:

centralizar definição de menus do sistema.

Cada item de navegação define:

```
label
icon
href
permission
group
order
```

Exemplo:

```
registerNavigationItem({
  label: "Users",
  href: "/admin/users",
  icon: UsersIcon,
  permission: "users.read"
})
```

Isso permitirá que:

- core registre menus
- plugins adicionem menus
- permissões controlem visibilidade

---

# Phase 5 — Admin Base

Objetivo: criar o painel administrativo.

- [ ] Layout do admin
- [ ] Dashboard admin
- [ ] Gestão de usuários
- [ ] Gestão de roles
- [ ] Configurações do sistema
- [ ] Gerenciamento de mídia

Rotas principais:

```
/admin
/admin/users
/admin/roles
/admin/settings
/admin/media
```

---

# Phase 6 — CMS Core

Objetivo: implementar o núcleo do sistema de conteúdo.

O CMS é responsável por **modelar e persistir conteúdo**, independentemente da forma como ele será editado.

O Page Builder será apenas **uma ferramenta de edição desse conteúdo**.

---

## Modelo de páginas

- [ ] Tabela `pages`
- [ ] Slugs únicos
- [ ] Estados de publicação (`draft`, `published`)
- [ ] Metadados SEO
- [ ] Autor e timestamps
- [ ] Documento de conteúdo (`document`)

Estrutura esperada:

```
Page {
id
title
slug
status
seoTitle
seoDescription
document
createdAt
updatedAt
}
```

---

## Documento de conteúdo

O conteúdo da página será armazenado como um **documento estruturado versionado**.

Exemplo:

```
PageDocument {
version
blocks[]
}
```

```
BlockNode {
id
type
props
children
}
```

Versionamento permitirá:

- migração de schema
- compatibilidade futura do builder

---

## Sistema de páginas

- [ ] CRUD de páginas
- [ ] Persistência do documento
- [ ] Publicação e despublicação
- [ ] Preview de página
- [ ] Histórico preparado para versionamento futuro

---

## SEO

- [ ] título SEO
- [ ] descrição SEO
- [ ] meta tags básicas

---

## Sistema de menus

- [ ] Tabela `menus`
- [ ] Tabela `menu_items`
- [ ] Estrutura hierárquica
- [ ] Associação com páginas

---

# Phase 7 — Page Builder

Objetivo: criar o editor visual de páginas.

---

## Block Registry

Sistema central para registro de blocos.

```
registerBlock({
  type,
  schema,
  defaultProps,
  renderer,
  editorConfig
})
```

Isso permite que:

- core registre blocos
- plugins adicionem blocos
- editor reconheça novos blocos automaticamente

---

## Renderer de blocos

Fluxo:

```
PageDocument
→ BlockRenderer
→ React Components
```

---

## Persistência

- [ ] salvar documento de blocos
- [ ] carregar documento existente
- [ ] compatibilidade com versões do schema

---

# Phase 8 — Plugin System

Objetivo: permitir expansão modular do Venore.

---

## Plugin Registry

Sistema responsável por registrar módulos.

Cada plugin pode registrar:

```
routes
menus
permissions
settings
blocks
```

---

## Permissions Registry

Plugins poderão registrar permissões automaticamente.

Exemplo:

```
registerPermission({
  name: "events.create"
})
```

---

## Navigation Injection

Plugins podem adicionar itens no menu:

```
registerNavigationItem(...)
```

---

# Phase 9 — First Module (Publishing)

Objetivo: criar o primeiro módulo completo.

Publishing servirá como:

- blog público
- jornal interno
- sistema editorial

---

# Phase 10 — Additional Modules

Gallery  
Documents  
Events  
Ouvidoria  
Photo Store

---

# Phase 11 — UX Improvements

- notificações
- busca global
- activity log
- auditoria

---

# Phase 12 — Performance & Hardening

- caching
- rate limiting
- security hardening
- testes E2E
- monitoramento

---

# Long Term Vision

Venore deverá evoluir para:

- plataforma modular de portais
- CMS com builder avançado
- sistema robusto de plugins
- fundação para múltiplos tipos de aplicações institucionais
