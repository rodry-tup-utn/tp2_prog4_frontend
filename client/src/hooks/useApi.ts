import { useEffect, useState } from "react";
import type { IUsuario } from "../types/usuario";
import { api } from "../services/api";
import type { IOpciones } from "../types/opciones";
import { toast } from "sonner";
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
      } catch (error: any) {
        const mensaje = error.message || "Error al conectarse con el servidor";
        setErrorParticipantes(mensaje);
        console.error("Error:", error);
      } finally {
        setLoadingParticipantes(false);
      }
    };
    cargarParticipantes();
  }, []);

  useEffect(() => {
    const cargarOpciones = async () => {
      let opcionesCargadas = false;
      try {
        const datosLocales = localStorage.getItem("opciones");
        if (datosLocales) {
          setOpciones(JSON.parse(datosLocales));
          opcionesCargadas = true;
        }

        const data = await api.obtenerOpciones();
        setOpciones(data);
        localStorage.setItem("opciones", JSON.stringify(data));
        opcionesCargadas = true;
      } catch (error) {
        if (!opcionesCargadas) {
          setErrorOpciones("No se pudo cargar el archivo de opciones");
          console.error("Error:", error);
        }
        console.warn(
          "No pudo conectar con la API pero se cargaron los datos desde Local",
        );
      } finally {
        setLoadingOpciones(false);
      }
    };
    cargarOpciones();
  }, []);

  const agregarParticipante = async (data: IUsuario): Promise<boolean> => {
    try {
      await api.registrarUsuario(data);
      toast.success("Usuario registrado con exito");
      return true;
    } catch (error) {
      console.error("Error al registrar el usuario", error);
      toast.error("No se pudo registrar el usuario");
      return false;
    }
  };

  return {
    participantes,
    setParticipantes,
    agregarParticipante,
    loadingParticipantes,
    errorParticipantes,
    opciones,
    errorOpciones,
    loadingOpciones,
  };
};
