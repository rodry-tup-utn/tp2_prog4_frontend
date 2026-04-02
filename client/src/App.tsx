import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { FormularioRegistro } from "./pages/FormularioRegistro";
import { ListaParticipantes } from "./pages/ListaParticipantes";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <main className="grow w-full mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<FormularioRegistro />} />

            <Route path="/participantes" element={<ListaParticipantes />} />

            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
