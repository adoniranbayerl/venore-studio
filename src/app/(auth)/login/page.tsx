import { signIn } from "@/core/auth";

export default function LoginPage() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", {
          redirectTo: "/dashboard",
        });
      }}
      className="flex flex-col gap-4 rounded-lg border bg-background p-8 shadow"
    >
      <h1 className="text-xl font-semibold">Entrar no Venore</h1>

      <button type="submit" className="rounded-md border px-4 py-2">
        Entrar com GitHub
      </button>
    </form>
  );
}
