import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ForbiddenPage() {
  return (
    <main className="container mx-auto flex min-h-screen max-w-3xl items-center justify-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border">
            <ShieldAlert className="size-7" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl">Acesso negado</CardTitle>
            <CardDescription className="text-base">
              Você não tem permissão para acessar esta área do sistema.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 size-4" />
              Voltar ao dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
