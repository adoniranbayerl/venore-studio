import { getAdminUsersList } from "@/core/permissions";
import { UsersTable } from "@/core/ui/admin/users-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function AdminUsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";

  const users = await getAdminUsersList(query);

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>
            Gerencie usuários e roles do sistema.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="flex flex-col gap-3 sm:flex-row">
            <Input
              name="q"
              placeholder="Buscar por e-mail..."
              defaultValue={query}
              className="sm:max-w-sm"
            />
            <Button type="submit">Buscar</Button>
          </form>

          <UsersTable users={users} />
        </CardContent>
      </Card>
    </main>
  );
}
