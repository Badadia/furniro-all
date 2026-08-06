import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Ops! A página que você está procurando não existe.
      </p>

      <Link
        to="/"
        className="px-4 py-2 bg-[#B88E2F] text-white rounded-md border-2 border-[#B88E2F] hover:bg-white hover:text-[#B88E2F] transition"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
