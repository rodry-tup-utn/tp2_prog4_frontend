import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold tracking-wide">
          <Link
            to={isAuthenticated ? "/" : "/inicio"}
            className="hover:text-blue-200 transition-colors"
          >
            Trabajo Practico 6: React y TypeScript
          </Link>
        </h1>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="bg-teal-800 hover:bg-blue-900 px-4 py-2 rounded font-semibold transition-colors shadow-sm text-sm"
              >
                Ver Registrados
              </Link>
              {user?.role === "ADMIN" && (
                <>
                  <Link
                    to="/usuarios/nuevo"
                    className="bg-teal-800 hover:bg-blue-900 px-4 py-2 rounded font-semibold transition-colors shadow-sm text-sm"
                  >
                    Nuevo Usuario
                  </Link>
                </>
              )}
              <div className="flex items-center gap-3 border-l border-blue-400 pl-6">
                <span className="text-sm text-blue-100 font-medium">
                  {user?.username} ({user?.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm font-semibold transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-teal-800 hover:bg-blue-900 px-4 py-2 rounded font-semibold transition-colors shadow-sm text-sm"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
