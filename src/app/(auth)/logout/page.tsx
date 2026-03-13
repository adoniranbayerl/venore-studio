import Link from "next/link";

export default function LogoutPage() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold">Saindo...</h1>
      <p className="text-lg text-center">
        Você está saindo do sistema. Se quiser voltar, clique no botão abaixo.
      </p>
      <div className="mt-8">
        <Link className="px-4 py-2 border rounded-md" href="/">
          Voltar para a home
        </Link>
      </div>
    </div>
  );
}
