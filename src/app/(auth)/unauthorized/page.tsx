import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold">
        Você não tem permissão para acessar essa página
      </h1>
      <p className="text-lg text-center">
        Se você acha que tem permissão para acessar essa página, por favor, faça
        o login novamente.
      </p>
      <div className="mt-8">
        <Link className="px-4 py-2 border rounded-md" href="/auth/login">
          Fazer login novamente{" "}
        </Link>
      </div>
    </div>
  );
}
