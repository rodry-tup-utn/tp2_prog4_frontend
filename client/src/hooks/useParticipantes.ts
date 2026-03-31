import { useEffect, useState } from "react";
import type { IUsuario } from "../types/usuario";
import { api } from "../services/api";

export const useParticipantes = () => {
  const [participantes, setParticipantes] = useState<IUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await api.obtenerUsuarios();
        setParticipantes(data);
      } catch (error) {
        setError("No se pudo conectar con la API");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);
  return {
    participantes,
    loading,
    error,
  };
};
