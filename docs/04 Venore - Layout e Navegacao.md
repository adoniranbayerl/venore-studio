# 04 Venore --- Layout e Navegação

## Visão Geral

Este documento descreve o sistema de **layout e navegação** do Venore
Studio. Ele define a arquitetura de interface utilizada no painel
administrativo, portal autenticado e páginas públicas.

O objetivo do sistema de layout é:

-   garantir consistência visual
-   permitir escalabilidade da UI
-   separar responsabilidades entre layout, navegação e conteúdo
-   suportar desktop e mobile
-   manter compatibilidade com o sistema de permissões (RBAC)

Stack utilizada:

-   **Next.js (App Router)**
-   **React**
-   **TailwindCSS**
-   **shadcn/ui**
-   **Lucide Icons**

------------------------------------------------------------------------

# Estrutura do Sistema de Layout

O sistema de layout está localizado principalmente em:

    src/core/ui/layout

Principais componentes:

    app-shell.tsx
    site-header.tsx
    sidebar-main.tsx
    sidebar-contextual.tsx
    page-container.tsx
    page-header.tsx
    nav-user.tsx
    nav-main.tsx
    nav-contextual.tsx

Esses componentes compõem a infraestrutura de navegação da aplicação.

------------------------------------------------------------------------

# Arquitetura do AppShell

O **AppShell** é o container estrutural da aplicação.

Ele organiza:

-   header
-   sidebar principal
-   sidebar contextual
-   conteúdo da página
-   footer

Estrutura geral:

    AppShell
     ├── SiteHeader
     ├── SidebarMain
     ├── SidebarContextual (desktop)
     └── Content Area
          ├── PageHeader
          ├── PageContainer
          └── Footer

Responsabilidades do AppShell:

-   controlar layout responsivo
-   gerenciar colapso da sidebar
-   controlar drawers mobile
-   aplicar offsets de layout
-   evitar overflow horizontal

------------------------------------------------------------------------

# SiteHeader

O **SiteHeader** é o topo global da aplicação.

Funções:

-   navegação principal no mobile
-   exibir branding
-   exibir menu do usuário
-   conter ações globais

Layout final definido:

Desktop:

    [ Logo ]                           [ User Menu ]

Mobile:

    [ Menu ]     [ Logo centralizada ]     [ User Menu ]

Decisões de design:

-   a logo é centralizada no mobile
-   o botão de menu aparece apenas no mobile
-   o contextual não aparece no mobile

------------------------------------------------------------------------

# Sidebar Principal (nav-main)

A **SidebarMain** contém a navegação principal do sistema.

Exemplo de seções:

    Administração
    Acesso
    CMS
    Sistema

Exemplos de rotas:

    Dashboard
    Usuários
    Papéis e permissões
    Páginas
    Menus
    Mídia
    Módulos

Funcionalidades:

-   colapso da sidebar
-   animações suaves
-   hover nos ícones
-   transições de largura

Estados:

    Expanded  → 288px
    Collapsed → 80px

No estado colapsado:

-   textos desaparecem
-   ícones permanecem visíveis
-   tooltips podem ser aplicados no futuro

------------------------------------------------------------------------

# Botão de Colapso

O botão de colapso:

-   fica no rodapé da sidebar
-   controla o estado collapsed

Importante:

**No mobile ele não aparece**, pois a sidebar funciona como drawer.

Implementação:

    hidden lg:block

------------------------------------------------------------------------

# Sidebar Contextual

A **SidebarContextual** aparece apenas em desktop.

Função:

-   navegação específica da página
-   ações secundárias
-   menus locais

Exemplo:

    Usuários
     ├─ Todos os usuários
     └─ Novo usuário

Decisão arquitetural:

**Ela não aparece no mobile.**

Motivo:

-   evitar múltiplas navegações concorrentes
-   simplificar a UX

No mobile, ações contextuais devem ir para:

-   PageHeader.actions
-   conteúdo da própria página

------------------------------------------------------------------------

# Sistema Responsivo

Breakpoints principais:

    lg  (1024px) → sidebar principal
    xl  (1280px) → sidebar contextual

Comportamento:

Desktop:

    SidebarMain | Content | SidebarContextual

Tablet:

    SidebarMain | Content

Mobile:

    Drawer SidebarMain
    Content

------------------------------------------------------------------------

# Navegação Mobile

No mobile:

-   sidebar principal vira **drawer**
-   overlay escurece o fundo
-   navegação abre via botão no header

Fluxo:

    Menu Button → Drawer Sidebar → Navegação

Contextual:

    não exibido

------------------------------------------------------------------------

# PageContainer

O **PageContainer** define a área de conteúdo padrão.

Responsabilidades:

-   padding consistente
-   limitar largura máxima
-   organizar seções da página

Estrutura típica:

    PageHeader
    PageContainer
     ├── filtros
     ├── tabela
     └── cards

Exemplo visual:

    Usuários
    Gerencie usuários da plataforma.

    [ Buscar ]

    Tabela de usuários

------------------------------------------------------------------------

# PageHeader

O PageHeader contém:

-   título da página
-   descrição
-   breadcrumbs
-   ações

Exemplo:

    Admin / Usuários

    Usuários
    Gerencie os usuários da plataforma.

Breadcrumbs:

-   aparecem apenas quando necessários
-   podem ser omitidos em páginas simples

------------------------------------------------------------------------

# NavUser

O **NavUser** mostra informações do usuário autenticado.

Conteúdo:

-   avatar
-   nome
-   email
-   menu dropdown

Exemplo de ações:

    Perfil
    Conta
    Sair

O componente funciona tanto:

-   em desktop
-   quanto em mobile

------------------------------------------------------------------------

# Animações e Microinterações

Foram adicionadas animações para melhorar a experiência:

### Sidebar

-   transição suave de largura
-   hover nos ícones
-   escala leve nos ícones

### Header

-   redução de altura no scroll
-   leve scaling da logo

### Drawer Mobile

-   transição translateX
-   overlay com fade

------------------------------------------------------------------------

# Problemas Encontrados e Soluções

## 1. Scroll horizontal inesperado

Causa:

    overflow + width calculations

Solução:

    overflow-x-hidden
    min-w-0

------------------------------------------------------------------------

## 2. Conteúdo desaparecendo no mobile

Causa:

    marginLeft e marginRight aplicados mesmo no mobile

Solução:

aplicar margens apenas em:

    lg → sidebar principal
    xl → sidebar contextual

------------------------------------------------------------------------

## 3. Ícones pulando no colapso

Causa:

transição simultânea de alinhamento.

Solução:

fixar container do ícone e animar apenas o texto.

------------------------------------------------------------------------

# Páginas Mock Criadas

Para validar o layout foram criadas páginas mock:

    /admin
    /admin/users
    /admin/roles
    /admin/pages
    /admin/media
    /admin/modules

Objetivo:

-   testar navegação
-   validar responsividade
-   preparar estrutura para o CMS

------------------------------------------------------------------------

# Padrões de Design do Venore

O sistema segue alguns princípios:

### Minimalismo funcional

Evitar excesso de elementos visuais.

### Layout consistente

Todos os módulos devem usar:

    PageHeader + PageContainer

### Navegação clara

Separação entre:

    nav-main
    nav-contextual
    conteúdo

------------------------------------------------------------------------

# Melhorias Futuras

Possíveis evoluções:

### Tooltips no modo colapsado

Mostrar labels dos ícones.

### Persistência do estado da sidebar

Salvar collapsed no localStorage.

### Comandos rápidos

Command palette.

### Layout adaptativo para tablets

Melhor aproveitamento do breakpoint md.

### Sistema de notificações

Badge no nav-user.

------------------------------------------------------------------------

# Conclusão

O sistema de layout do Venore estabelece uma base sólida para o
crescimento da plataforma.

Ele garante:

-   navegação clara
-   arquitetura escalável
-   responsividade consistente
-   integração com o sistema de permissões

Com essa infraestrutura, novos módulos podem ser adicionados sem alterar
a base estrutural da aplicação.
