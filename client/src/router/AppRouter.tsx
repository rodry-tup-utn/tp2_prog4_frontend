import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { FormularioRegistro } from "../pages/FormularioRegistro";
import { ListaParticipantes } from "../pages/ListaParticipantes";
import { LoginPage } from "../pages/LoginPage";
import { Inicio } from "../pages/Inicio";
import { RegisterUser } from "../pages/RegisterUser";
import { PrivateRoute } from "../components/PrivateRoute";
import { ParticipantesProvider } from "../context/ParticipantesContext";
import { useAuth } from "../context/AuthContext";

function PrivateLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <ParticipantesProvider>
      <Outlet />
    </ParticipantesProvider>
  );
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<ListaParticipantes />} />
        <Route
          path="/participante"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <FormularioRegistro />
            </PrivateRoute>
          }
        />
        <Route
          path="/participante/:id"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <FormularioRegistro />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/nuevo"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <RegisterUser />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <h2 className="text-red-700 p-6 rounded-2xl bg-red-100 text-center">
            404 - Página no encontrada
          </h2>
        }
      />
    </Routes>
  );
};
