import Link from "next/link";

export default function ErrorFallbackPage() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold">Erro inesperado</h1>
      <p className="text-lg text-center">
        Ocorreu um erro inesperado. Se quiser voltar para a home, clique no
        botão abaixo.
      </p>
      <div className="mt-8">
        <Link className="px-4 py-2 border rounded-md" href="/">
          <span className="text-blue-600 hover:text-blue-800">
            Voltar para a home
          </span>
        </Link>
      </div>
    </div>
  );
}
