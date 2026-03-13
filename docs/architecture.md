# Venore — Architecture

## Overview

Venore é um **produto-base para construção de portais modernos** com:

- área pública
- área autenticada
- painel administrativo
- CMS com page builder
- sistema de permissões
- arquitetura modular (plugins)

O objetivo do Venore é servir como **fundação reutilizável** para múltiplos tipos de portais:

- portal do colaborador
- portal do aluno
- intranet
- área de membros
- portal institucional

---

# Core Principles

1. **Single-tenant**
   Cada portal possui sua própria instalação.

2. **Domain separation**
   A arquitetura é separada em domínios claros.

3. **Plugin architecture**
   Funcionalidades de negócio vivem em módulos.

4. **Core independence**
   O core nunca depende de módulos.

5. **CMS ≠ Modules**
   Page builder resolve páginas.
   Módulos resolvem funcionalidades estruturadas.

---

# System Layers

## Core

Infraestrutura fundamental do sistema.

Responsabilidades:

- auth
- users
- roles
- permissions
- navigation
- settings
- media
- plugin registry
- UI base
- logging

Localização:

src/core

---

## CMS

Responsável por conteúdo editável.

Responsabilidades:

- pages
- page builder
- menus
- seo
- slugs

Localização:

src/cms

---

## Portal

Experiência padrão do usuário autenticado.

Responsabilidades:

- dashboard
- profile
- account
- notifications

Localização:

src/portal

---

## Admin

Painel administrativo do sistema.

Responsabilidades:

- users
- roles
- permissions
- settings
- media
- CMS management
- modules

Localização:

src/admin

---

## Modules (Plugins)

Funcionalidades de domínio.

Exemplos:

- gallery
- publishing
- ouvidoria
- documents
- events
- photo-store

Localização:

src/modules

---

# Routing Structure

Next.js App Router usando route groups.

src/app

## Public

(public)

Exemplos:

/
[...slug]
/blog
/blog/[slug]

---

## Auth

(auth)

Exemplos:

/login
/logout
/unauthorized
/error

---

## Private

Área autenticada.

(private)

Exemplos:

/dashboard
/profile
/account
/notifications
/portal/[...slug]

---

## Admin

Painel administrativo.

/admin

Exemplos:

/admin/users
/admin/roles
/admin/settings
/admin/pages
/admin/modules

---

# Folder Structure

src
├ app
│ ├ (public)
│ ├ (auth)
│ ├ (private)
│ ├ admin
│ └ api
│
├ core
│ ├ auth
│ ├ users
│ ├ permissions
│ ├ navigation
│ ├ settings
│ ├ media
│ ├ ui
│ └ plugins
│
├ cms
│ ├ pages
│ ├ builder
│ ├ menus
│ └ seo
│
├ portal
│ ├ dashboard
│ ├ profile
│ ├ account
│ └ notifications
│
├ admin
│ ├ dashboard
│ ├ users
│ ├ roles
│ ├ settings
│ ├ media
│ ├ pages
│ ├ menus
│ └ modules
│
├ modules
│ ├ gallery
│ ├ ouvidoria
│ ├ photo-store
│ ├ documents
│ └ events
│
├ components
│ ├ ui
│ ├ layout
│ └ shared
│
├ db
│ ├ schema
│ ├ migrations
│ └ seeds
│
├ lib
├ hooks
└ types

---

# Icon System

O Venore utiliza um **icon provider system**.

Bibliotecas suportadas:

- lucide
- tabler
- heroicons

O sistema usa um wrapper único:

<Icon name="settings" />

Localização:

src/core/ui/icon

---

# Plugin System

Cada módulo registra:

- id
- name
- permissions
- menu entries
- routes
- settings schema

Isso permite que módulos se integrem ao sistema sem modificar o core.

---

# Page Builder

O CMS possui um editor baseado em blocos.

Tipos de blocos:

Layout

- section
- container
- grid
- columns

Content

- title
- text
- image
- gallery
- video
- embed
- cards
- accordion

Cada bloco possui:

- type
- schema
- defaultProps
- renderer
- editorConfig

---

# Tech Stack

Framework

- Next.js
- React
- TypeScript

UI

- Tailwind
- shadcn/ui

Auth

- Auth.js

Database

- PostgreSQL
- Drizzle ORM

Validation

- Zod

Forms

- React Hook Form

Drag and Drop

- dnd-kit

Icons

- lucide
- tabler
- heroicons
