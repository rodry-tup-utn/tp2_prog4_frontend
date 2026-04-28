import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-blue-200 transition-colors">
            Trabajo Practico 2: React y TypeScript
          </Link>
        </h1>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="bg-teal-800 hover:bg-blue-900 px-4 py-2 rounded font-semibold transition-colors shadow-sm text-sm"
          >
            Ver Registrados
          </Link>
          <Link
            to="/nuevo"
            className="bg-teal-800 hover:bg-blue-900 px-4 py-2 rounded font-semibold transition-colors shadow-sm text-sm"
          >
            Formulario de Registro
          </Link>

          <p className="text-blue-100 text-sm hidden md:block font-medium border-l border-blue-400 pl-6">
            Programación IV
          </p>
        </div>
      </div>
    </header>
  );
};
