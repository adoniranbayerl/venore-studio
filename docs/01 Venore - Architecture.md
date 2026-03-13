# Venore --- Architecture

Venore é uma plataforma base para construção de **portais modernos e
modulares**, com foco em:

-   CMS
-   Portais institucionais
-   Sistemas internos
-   Aplicações extensíveis por plugins

A arquitetura foi projetada para:

-   modularidade
-   extensibilidade
-   separação clara de responsabilidades
-   integração entre CMS, portal e módulos

------------------------------------------------------------------------

# Stack Tecnológica

## Frontend / Framework

-   Next.js (App Router)
-   React
-   TypeScript

## UI

-   Tailwind
-   shadcn/ui

## Backend

-   Auth.js
-   PostgreSQL
-   Drizzle ORM

## Infraestrutura futura

-   dnd-kit (Page Builder)
-   Sistema de plugins

------------------------------------------------------------------------

# Estrutura de Rotas

O Venore usa **Route Groups do Next.js** para separar contextos da
aplicação.

src/app

(public) → conteúdo público (site, blog)\
(auth) → autenticação (login, logout)\
(private) → portal do usuário autenticado\
admin → painel administrativo\
api → APIs do sistema

------------------------------------------------------------------------

# Estrutura de Pastas

src/

app/ (public) (auth) (private) admin api

core/ auth users permissions navigation settings media ui plugins

cms/ pages builder menus seo

portal/ dashboard profile account notifications

admin/ dashboard users roles settings media pages menus modules

modules/ gallery ouvidoria photo-store documents events

components/ ui layout shared

db/ schema migrations seeds

hooks/ lib/ types/

------------------------------------------------------------------------

# Camadas do Sistema

## Core

Infraestrutura fundamental do sistema.

Responsável por: - autenticação - usuários - permissões - navegação -
configurações - media - plugins

src/core

------------------------------------------------------------------------

## CMS

Sistema de gestão de conteúdo.

Responsável por: - páginas - menus - SEO - documento de conteúdo -
integração com Page Builder

src/cms

------------------------------------------------------------------------

## Portal

Experiência do usuário autenticado.

Responsável por: - dashboard - profile - account - notifications

src/portal

------------------------------------------------------------------------

## Admin

Painel administrativo do sistema.

Responsável por: - gestão de usuários - gestão de roles -
configurações - CMS - módulos

src/admin

------------------------------------------------------------------------

## Modules

Plugins de domínio.

Exemplos: - gallery - events - ouvidoria - documents - photo-store

src/modules

------------------------------------------------------------------------

# Banco de Dados

Gerenciado com **PostgreSQL + Drizzle ORM**.

Estrutura inicial:

users accounts sessions verification_tokens

roles permissions role_permissions user_roles

Migrations gerenciadas pelo Drizzle.

------------------------------------------------------------------------

# Core Auth

Implementado com **Auth.js + Drizzle Adapter**.

Sessões persistidas em banco.

Fluxo:

Login OAuth ↓ Auth.js callback ↓ Adapter Drizzle ↓ Session salva em
banco ↓ Session callback adiciona roles e permissions

Estratégia de sessão:

session.strategy = "database"

Providers atuais: - GitHub

Providers planejados: - Google - Microsoft - Magic Link (OTP email)

------------------------------------------------------------------------

# Permissions System

Modelo RBAC (Role Based Access Control).

Tabelas:

roles permissions role_permissions user_roles

Fluxo de autorização:

login ↓ session callback ↓ getUserAuthorizationData ↓ session.user.roles
session.user.permissions

------------------------------------------------------------------------

# Layout System

Estrutura de layout da aplicação baseada em **App Shell**.

AppShell ├ Header ├ Sidebar principal ├ Sidebar contextual ├
PageContainer └ Footer

Componentes principais:

-   SiteHeader
-   PageHeader
-   PageContainer
-   Breadcrumbs
-   SidebarNav
-   ContextNav

Integrações:

-   navigation
-   permissions
-   contexto do usuário

------------------------------------------------------------------------

# CMS + Page Builder

O CMS é responsável por **modelar conteúdo**.

O Page Builder é responsável por **editar visualmente o documento de
conteúdo**.

Estrutura de documento:

PageDocument - version - blocks\[\]

BlockNode - id - type - props - children

------------------------------------------------------------------------

# Plugin System (Planejado)

Plugins poderão registrar:

-   rotas
-   menus
-   permissões
-   blocos do builder
-   configurações

Permitindo que módulos expandam o sistema sem alterar o core.

------------------------------------------------------------------------

# Objetivo da Arquitetura

Permitir que o Venore evolua para:

-   CMS modular
-   plataforma de portais
-   sistema extensível por plugins
-   base para aplicações institucionais complexas
