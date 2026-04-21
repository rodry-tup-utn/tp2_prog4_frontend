import { Route, Routes } from "react-router-dom";
import { FormularioRegistro } from "../pages/FormularioRegistro";
import { ListaParticipantes } from "../pages/ListaParticipantes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/nuevo" element={<FormularioRegistro />} />

      <Route path="/" element={<ListaParticipantes />} />

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
