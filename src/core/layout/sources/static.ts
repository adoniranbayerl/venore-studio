import type { LayoutPageMetaResolver } from "../types";

export const staticPageMetaResolvers: LayoutPageMetaResolver[] = [
  {
    pattern: /^\/dashboard$/,
    meta: {
      title: "Dashboard",
      metadata: "Visão geral do portal do usuário.",
    },
  },
  {
    pattern: /^\/profile$/,
    meta: {
      title: "Perfil",
      metadata: "Dados e informações do usuário.",
    },
  },
  {
    pattern: /^\/account$/,
    meta: {
      title: "Conta",
      metadata: "Configurações e preferências da conta.",
    },
  },
  {
    pattern: /^\/notifications$/,
    meta: {
      title: "Notificações",
      metadata: "Atualizações e avisos do sistema.",
    },
  },
  {
    pattern: /^\/admin$/,
    meta: {
      title: "Admin",
      metadata: "Painel administrativo do sistema.",
    },
  },
  {
    pattern: /^\/admin\/users$/,
    meta: {
      title: "Usuários",
      metadata: "Gerencie os usuários da plataforma.",
    },
  },
  {
    pattern: /^\/admin\/users\/create$/,
    meta: {
      title: "Criar usuário",
      metadata: "Cadastre um novo usuário no sistema.",
    },
  },
  {
    pattern: /^\/admin\/roles$/,
    meta: {
      title: "Papéis e permissões",
      metadata: "Gerencie roles e permissões do sistema.",
    },
  },
  {
    pattern: /^\/admin\/pages$/,
    meta: {
      title: "Páginas",
      metadata: "Gerencie as páginas do CMS.",
    },
  },
  {
    pattern: /^\/admin\/pages\/create$/,
    meta: {
      title: "Nova página",
      metadata: "Crie uma nova página no CMS.",
    },
  },
  {
    pattern: /^\/admin\/menus$/,
    meta: {
      title: "Menus",
      metadata: "Gerencie a navegação e os menus do portal.",
    },
  },
  {
    pattern: /^\/admin\/media$/,
    meta: {
      title: "Mídia",
      metadata: "Gerencie arquivos e mídia do sistema.",
    },
  },
  {
    pattern: /^\/admin\/modules$/,
    meta: {
      title: "Módulos",
      metadata: "Gerencie módulos e extensões do Venore.",
    },
  },
  {
    pattern: /^\/admin\/settings$/,
    meta: {
      title: "Configurações",
      metadata: "Ajustes gerais do sistema.",
    },
  },
];
