import { createContext, useContext } from "react";
import type { IOpciones } from "../types/opciones";
import type { IUsuario } from "../types/usuario";
import type { IFiltros } from "../types/apiTypes";
import { useParticipantesManager } from "../hooks/useParticipantesManager";

interface ContextType {
  participantes: IUsuario[];
  total: number;
  loadingParticipantes: boolean;
  errorParticipantes: string | null;
  opciones: IOpciones | null;
  errorOpciones: string | null;
  loadingOpciones: boolean;
  offset: number;
  limit: number;
  filtros: IFiltros;
  setFiltros: (filtros: IFiltros) => void;
  agregarParticipante: (participante: IUsuario) => Promise<IUsuario>;
  eliminarParticipante: (usuarioId: number) => Promise<boolean>;
  cargarParticipantePorId: (participanteId: number) => Promise<IUsuario>;
  modificarParticipante: (
    data: IUsuario,
    idUsuario: number,
  ) => Promise<IUsuario>;
  anteriorPagina: () => void;
  siguientePagina: () => void;
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
  const manager = useParticipantesManager();

  const contextValue: ContextType = {
    participantes: manager.participantes,
    total: manager.total,
    loadingParticipantes: manager.loadingParticipantes,
    errorParticipantes: manager.errorParticipantes,
    opciones: manager.opciones,
    errorOpciones: manager.errorOpciones,
    loadingOpciones: manager.loadingOpciones,
    offset: manager.offset,
    limit: manager.limit,
    filtros: manager.filtros,
    setFiltros: manager.setFiltros,
    agregarParticipante: manager.agregarParticipante,
    eliminarParticipante: manager.eliminarParticipante,
    cargarParticipantePorId: manager.cargarParticipantePorId,
    modificarParticipante: manager.modificarParticipante,
    anteriorPagina: manager.anteriorPagina,
    siguientePagina: manager.siguientePagina,
  };

  return (
    <ParticipantesContext.Provider value={contextValue}>
      {children}
    </ParticipantesContext.Provider>
  );
}
