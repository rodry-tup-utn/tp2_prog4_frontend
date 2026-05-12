import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useParticipantes } from "../context/ParticipantesContext";
import type { IUsuario } from "../types/usuario";

export const useParticipanteRegistro = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [participanteEdicion, setParticipanteEdicion] =
    useState<IUsuario | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(false);

  const {
    opciones,
    loadingOpciones,
    errorOpciones,
    agregarParticipante,
    modificarParticipante,
    cargarParticipantePorId,
  } = useParticipantes();

  const isEditing = Boolean(id);

  useEffect(() => {
    if (!id) {
      setParticipanteEdicion(null);
      return;
    }

    const cargar = async () => {
      try {
        setLoadingLocal(true);
        const participante = await cargarParticipantePorId(Number(id));
        setParticipanteEdicion(participante);
      } catch (error: any) {
        toast.error(error.message || "No se pudo cargar el participante");
        navigate("/");
      } finally {
        setLoadingLocal(false);
      }
    };
    cargar();
  }, [id, cargarParticipantePorId, navigate]);

  const handleGuardar = async (datos: IUsuario) => {
    try {
      if (isEditing) {
        await modificarParticipante(datos, Number(id));
        toast.success("Participante actualizado con éxito");
      } else {
        await agregarParticipante(datos);
        toast.success(`Usuario ${datos.nombre} registrado`);
      }
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error al procesar");
    }
  };

  return {
    isEditing,
    loading: loadingOpciones || loadingLocal,
    error: errorOpciones,
    opciones,
    participanteEdicion,
    handleGuardar,
  };
};
