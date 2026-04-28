import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { ParticipantesProvider } from "./context/ParticipantesContext";
import { FiltrosProvider } from "./context/FiltrosContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ParticipantesProvider>
          <FiltrosProvider>
            <Toaster position="top-left" richColors></Toaster>
            <div className="min-h-screen flex flex-col bg-linear-to-r from-blue-800 to-indigo-900">
              <NavBar />
              <main className="grow w-full max-w-7xl mx-auto px-6 py-8">
                <AppRouter />
              </main>
              <Footer />
            </div>
          </FiltrosProvider>
        </ParticipantesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
