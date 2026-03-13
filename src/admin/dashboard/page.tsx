import { auth } from "@/core/auth";

export default async function Page() {
  const session = await auth();

  return (
    <main className="space-y-4 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Session Debug</h1>
        <p className="text-muted-foreground text-sm">
          Dados atuais do usuário autenticado.
        </p>
      </div>

      <pre className="bg-muted overflow-x-auto rounded-xl border p-4 text-sm">
        {JSON.stringify(session?.user ?? null, null, 2)}
      </pre>
    </main>
  );
}
