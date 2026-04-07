import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <>
      <Toaster position="top-left" richColors></Toaster>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <main className="grow w-full mx-auto px-6 py-8">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
