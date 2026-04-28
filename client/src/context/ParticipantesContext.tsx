import { createContext, useContext } from "react";
import type { IOpciones } from "../types/opciones";
import type { IUsuario } from "../types/usuario";
import { useApi } from "../hooks/useApi";

interface ContextType {
  participantes: IUsuario[];
  loadingParticipantes: boolean;
  errorParticipantes: string | null;
  opciones: IOpciones | null;
  errorOpciones: string | null;
  loadingOpciones: boolean;
  agregarParticipante: (participante: IUsuario) => Promise<IUsuario>;
  eliminarParticipante: (usuarioId: number) => Promise<IUsuario>;
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

  const contextValue: ContextType = {
    participantes,
    agregarParticipante,
    eliminarParticipante,
    loadingParticipantes,
    opciones,
    errorOpciones,
    errorParticipantes,
    loadingOpciones,
  };

  return (
    <ParticipantesContext.Provider value={contextValue}>
      {children}
    </ParticipantesContext.Provider>
  );
}
