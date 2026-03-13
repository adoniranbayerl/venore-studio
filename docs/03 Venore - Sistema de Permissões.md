# 03 Venore - Sistema de Permissões

## Visão Geral

O Sistema de Permissões do Venore implementa RBAC (Role Based Access Control).
Ele controla acesso a rotas, ações e partes da interface usando roles e permissões.

Stack:

- Next.js
- Auth.js v5
- PostgreSQL
- Drizzle ORM

---

## Estrutura

src/core/permissions

Arquivos principais:

roles.ts
permissions.ts
helpers.ts
guards.ts
service.ts
queries.ts
invariants.ts
types.ts
permission-gate.tsx
index.ts

---

## Banco de Dados

Tabelas principais:

roles
permissions
user_roles
role_permissions

---

## Fluxo de Autorização

Login → Auth.js cria sessão → carregamos roles e permissions →
helpers e guards usam esses dados.

session.user.roles
session.user.permissions

---

## Helpers

hasRole(user, role)

hasPermission(user, permission)

hasAnyPermission(user, permissions)

hasAllPermissions(user, permissions)

---

## Guards

requireAuth()

requireRole(role)

requirePermission(permission)

---

## UI Guard

PermissionGate protege partes da interface.

Exemplo:

PermissionGate permission="users.manage"

---

## Services

assignRoleToUser(userId, roleId)

removeRoleFromUser(userId, roleId)

addPermissionToRole(roleId, permissionId)

removePermissionFromRole(roleId, permissionId)

---

## Invariantes

O sistema impede remover o último super-admin.

assertCannotRemoveLastSuperAdmin()

---

## Admin

Interface administrativa:

/admin/users

Permite:

listar usuários
buscar usuários
atribuir roles
remover roles

---

## Organização UI

components/ui → componentes reutilizáveis
core/ui → interface estrutural do sistema

---

## Próximas Evoluções

/admin/roles
/admin/permissions
registro automático de permissões por módulos
cache de autorização por request
