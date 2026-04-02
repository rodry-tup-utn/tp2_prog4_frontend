import { useEffect, useState } from "react";
import type { IUsuario } from "../types/usuario";
import { api } from "../services/api";
import type { IOpciones } from "../types/opciones";

export const useApi = () => {
  const [participantes, setParticipantes] = useState<IUsuario[]>([]);
  const [loadingParticipantes, setLoadingParticipantes] = useState(true);
  const [errorParticipantes, setErrorParticipantes] = useState<string | null>(
    null,
  );
  const [opciones, setOpciones] = useState<IOpciones | null>(null);
  const [loadingOpciones, setLoadingOpciones] = useState(true);
  const [errorOpciones, setErrorOpciones] = useState("");

  useEffect(() => {
    const cargarParticipantes = async () => {
      try {
        const data = await api.obtenerUsuarios();
        setParticipantes(data);
      } catch (error) {
        setErrorParticipantes("No se pudo conectar con la API");
        console.error("Error:", error);
      } finally {
        setLoadingParticipantes(false);
      }
    };
    cargarParticipantes();
  }, []);

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const data = await api.obtenerOpciones();
        setOpciones(data);
      } catch (error) {
        setErrorOpciones("No se pudo cargar el archivo de opciones");
        console.error("Error:", error);
      } finally {
        setLoadingOpciones(false);
      }
    };
    cargarOpciones();
  }, []);
  return {
    participantes,
    setParticipantes,
    loadingParticipantes,
    errorParticipantes,
    opciones,
    errorOpciones,
    loadingOpciones,
  };
};
