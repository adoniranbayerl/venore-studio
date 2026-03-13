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

### Próximos passos

- [x] Configuração do banco (PostgreSQL + Drizzle)
- [x] Estrutura inicial do schema
- [x] Configuração de variáveis de ambiente
- [x] Conexão com banco

---

# Phase 2 — Core Auth

Objetivo: implementar autenticação e identidade de usuário.

- [x] Tabela `users`
- [x] Configuração do Auth.js
- [x] Sessões
- [ ] Login com OTP por email
- [x] OAuth (Google / Microsoft / Github)
- [x] proxy.ts para rotas privadas
- [x] Guards de autenticação

Resultado esperado:

- usuário consegue criar sessão
- rotas `(private)` protegidas

---

# Phase 3 — Permissions System

Objetivo: criar sistema de acesso baseado em roles e permissões.

- [x] Tabela `roles`
- [x] Tabela `permissions`
- [x] Tabela `role_permissions`
- [x] Tabela `user_roles`
- [x] Guards de permissão
- [x] PermissionGate (UI)

Exemplos de permissões:

- `users.read`
- `users.write`
- `pages.read`
- `pages.write`
- `pages.publish`

---

# Phase 4 — Layout System

Objetivo: criar o layout base da aplicação.

- [ ] App Shell
- [ ] Header
- [ ] Sidebar principal
- [ ] Sidebar contextual
- [ ] Footer
- [ ] Breadcrumbs

Integrações:

- navegação
- permissões
- contexto do usuário

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
/admin
/admin/users
/admin/roles
/admin/settings
/admin/media

---

# Phase 6 — CMS Core

Objetivo: implementar o sistema de conteúdo.

- [ ] Sistema de páginas
- [ ] Slugs
- [ ] Estados (draft/published)
- [ ] SEO básico
- [ ] Sistema de menus

Rotas:
/admin/pages
/admin/menus

---

# Phase 7 — Page Builder

Objetivo: criar o editor visual de páginas.

### Infraestrutura

- [ ] Schema de blocos
- [ ] Renderer de blocos
- [ ] Persistência de layout

### Editor

- [ ] Drag and drop (dnd-kit)
- [ ] Painel de propriedades
- [ ] Biblioteca de blocos

### Blocos iniciais

- [ ] title
- [ ] text
- [ ] image
- [ ] gallery
- [ ] video
- [ ] embed
- [ ] cards
- [ ] accordion

---

# Phase 8 — Plugin System

Objetivo: permitir expansão modular do Venore.

- [ ] Plugin registry
- [ ] Plugin contract
- [ ] Registro automático de módulos
- [ ] Injeção de menus
- [ ] Registro de permissões
- [ ] Configurações por módulo

Cada plugin poderá registrar:

- rotas
- menus
- permissões
- settings

---

# Phase 9 — First Module (Publishing)

Objetivo: criar o primeiro módulo completo.

Publishing servirá como:

- blog público
- jornal interno
- sistema editorial

### Features

- [ ] Posts
- [ ] Categorias
- [ ] Tags
- [ ] Autores
- [ ] SEO
- [ ] Visibilidade (public/private)

Rotas:
/blog
/blog/[slug]
/portal/blog
/portal/blog/[slug]

---

# Phase 10 — Additional Modules

Após validar o plugin system.

### Gallery

- [ ] Álbuns
- [ ] Fotos
- [ ] Eventos

### Documents

- [ ] Biblioteca de arquivos
- [ ] Downloads
- [ ] Categorias

### Events

- [ ] Agenda
- [ ] Inscrições

### Ouvidoria

- [ ] Tickets
- [ ] Respostas
- [ ] Histórico

### Photo Store

- [ ] Catálogo
- [ ] Pedidos
- [ ] Integração de pagamento

---

# Phase 11 — UX Improvements

- [ ] Sistema de notificações
- [ ] Busca global
- [ ] Activity log
- [ ] Auditoria

---

# Phase 12 — Performance & Hardening

- [ ] Caching
- [ ] Rate limiting
- [ ] Security hardening
- [ ] Testes E2E
- [ ] Monitoramento

---

# Long Term Vision

Venore deverá evoluir para:

- plataforma modular de portais
- CMS com builder avançado
- sistema robusto de plugins
- fundação para múltiplos tipos de aplicações institucionais
