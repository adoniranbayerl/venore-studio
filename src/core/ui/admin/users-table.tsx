import {
  removeRole,
  promoteToAdmin,
  promoteToSuperAdmin,
} from "@/app/admin/users/actions";
import type { AdminUsersListItem } from "@/core/permissions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UsersTableProps = {
  users: AdminUsersListItem[];
};

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-x-auto rounded border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>E-mail</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground py-8 text-center"
              >
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>

                <TableCell>{user.name ?? "-"}</TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {user.roles.length === 0 ? (
                      <Badge variant="outline">sem role</Badge>
                    ) : (
                      user.roles.map((role) => (
                        <form
                          key={`${user.id}-${role}`}
                          action={removeRole.bind(null, user.id, role)}
                        >
                          <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="h-auto rounded-full px-3 py-1"
                          >
                            {role} ×
                          </Button>
                        </form>
                      ))
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap justify-end gap-2">
                    <form action={promoteToAdmin.bind(null, user.id)}>
                      <Button type="submit" size="sm" variant="secondary">
                        Admin
                      </Button>
                    </form>

                    <form action={promoteToSuperAdmin.bind(null, user.id)}>
                      <Button type="submit" size="sm">
                        Super Admin
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
