import { createContext, useContext } from "react";
import type { IFiltros } from "../types/filtros";
import type { IOpciones } from "../types/opciones";
import type { IUsuario } from "../types/usuario";
import { useApi } from "../hooks/useApi";
import { useFiltros } from "../hooks/useFiltros";

interface ContextType {
  participantes: IUsuario[];
  participantesFiltrados: IUsuario[];
  loadingParticipantes: boolean;
  errorParticipantes: string | null;
  opciones: IOpciones | null;
  errorOpciones: string | null;
  loadingOpciones: boolean;
  agregarParticipante: (participante: IUsuario) => Promise<IUsuario>;
  eliminarParticipante: (usuarioId: number) => Promise<IUsuario>;
  filtros: IFiltros;
  setFiltros: React.Dispatch<React.SetStateAction<IFiltros>>;
}

const ParticipantesContext = createContext<ContextType | null>(null);

export function useParticipantes() {
  const context = useContext(ParticipantesContext);
  if (!context)
    throw new Error(
      "useParticipantes debe usarse dentro de ParticipantesProvider",
    );
  return context;
}

export function ParticipantesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    participantes,
    agregarParticipante,
    eliminarParticipante,
    loadingParticipantes,
    opciones,
    loadingOpciones,
    errorOpciones,
    errorParticipantes,
  } = useApi();
  const { filtros, participantesFiltrados, setFiltros } =
    useFiltros(participantes);

  const contextValue: ContextType = {
    participantes,
    agregarParticipante,
    eliminarParticipante,
    setFiltros,
    loadingParticipantes,
    opciones,
    errorOpciones,
    errorParticipantes,
    filtros,
    loadingOpciones,
    participantesFiltrados,
  };

  return (
    <ParticipantesContext.Provider value={contextValue}>
      {children}
    </ParticipantesContext.Provider>
  );
}
