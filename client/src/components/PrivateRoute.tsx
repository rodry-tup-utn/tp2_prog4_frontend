import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  requiredRole?: string;
}

export const PrivateRoute = ({ children, requiredRole }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl text-center">
          <h2 className="text-xl font-bold mb-2">Acceso Denegado</h2>
          <p>No tenés permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
