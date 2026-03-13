import { getCurrentUser, signOut } from "@/core/auth";
import { PERMISSIONS, PermissionGate, ROLES } from "@/core/permissions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <main className="container mx-auto max-w-6xl p-6 md:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <Badge variant="secondary">Venore • Dashboard</Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            Painel do usuário
          </h1>
          <p className="text-muted-foreground">
            Área de teste de autenticação e permissões do core.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/login",
            });
          }}
        >
          <Button variant="outline">Sair</Button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Usuário autenticado</CardTitle>
            <CardDescription>Dados básicos da sessão atual.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Nome</p>
              <p className="font-medium">{user?.name ?? "Sem nome"}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">E-mail</p>
              <p className="font-medium break-all">
                {user?.email ?? "Sem e-mail"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">ID</p>
              <p className="text-sm break-all">{user?.id ?? "Sem ID"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resumo de autorização</CardTitle>
            <CardDescription>
              Roles e permissões carregadas a partir do Auth.js + RBAC.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium">Roles</p>

              {user?.roles?.length ? (
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Nenhuma role atribuída.
                </p>
              )}
            </div>

            <Separator />

            <div>
              <p className="mb-3 text-sm font-medium">Permissions</p>

              {user?.permissions?.length ? (
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission) => (
                    <Badge key={permission}>{permission}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Nenhuma permissão carregada.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Teste por role</CardTitle>
            <CardDescription>
              Exibição condicional usando <code>PermissionGate</code>.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <PermissionGate
              user={user}
              role={ROLES.ADMIN}
              fallback={
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  Você não possui a role <strong>admin</strong>.
                </div>
              }
            >
              <div className="rounded-xl border p-4">
                <p className="font-medium">Área visível para Admin</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Este bloco só aparece para quem possui a role{" "}
                  <code>admin</code>.
                </p>
              </div>
            </PermissionGate>

            <PermissionGate
              user={user}
              role={ROLES.SUPER_ADMIN}
              fallback={
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  Você não possui a role <strong>super-admin</strong>.
                </div>
              }
            >
              <div className="rounded-xl border p-4">
                <p className="font-medium">Área visível para Super Admin</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Este bloco só aparece para quem possui a role{" "}
                  <code>super-admin</code>.
                </p>
              </div>
            </PermissionGate>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teste por permission</CardTitle>
            <CardDescription>
              Validação por permissão explícita do sistema.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <PermissionGate
              user={user}
              permission={PERMISSIONS.ADMIN_ACCESS}
              fallback={
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  Você não possui a permissão <strong>admin.access</strong>.
                </div>
              }
            >
              <div className="rounded-xl border p-4">
                <p className="font-medium">Acesso ao Admin liberado</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  O usuário possui a permissão <code>admin.access</code>.
                </p>
              </div>
            </PermissionGate>

            <PermissionGate
              user={user}
              permission={PERMISSIONS.USERS_MANAGE}
              fallback={
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  Você não possui a permissão <strong>users.manage</strong>.
                </div>
              }
            >
              <div className="rounded-xl border p-4">
                <p className="font-medium">
                  Gerenciamento de usuários liberado
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  O usuário possui a permissão <code>users.manage</code>.
                </p>
              </div>
            </PermissionGate>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Debug da sessão</CardTitle>
          <CardDescription>
            Visualização completa do objeto <code>session.user</code>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <pre className="bg-muted overflow-x-auto rounded-xl border p-4 text-sm">
            {JSON.stringify(user ?? null, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </main>
  );
}
