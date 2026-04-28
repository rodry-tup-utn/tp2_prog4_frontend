import { createContext, useContext, useState, type ReactNode } from "react";
import type { IFiltros } from "../types/filtros";

interface FiltrosContextType {
  filtros: IFiltros;
  setFiltros: React.Dispatch<React.SetStateAction<IFiltros>>;
}

const FiltrosContext = createContext<FiltrosContextType | null>(null);

export function useFiltros() {
  const context = useContext(FiltrosContext);
  if (!context) throw new Error("useFiltros debe usarse dentro del provider");
  return context;
}

export function FiltrosProvider({ children }: { children: ReactNode }) {
  const [filtros, setFiltros] = useState<IFiltros>({
    busqueda: "",
    modalidad: "",
    nivel: "",
    tecnologia: "",
  });

  return (
    <FiltrosContext.Provider value={{ filtros, setFiltros }}>
      {children}
    </FiltrosContext.Provider>
  );
}
