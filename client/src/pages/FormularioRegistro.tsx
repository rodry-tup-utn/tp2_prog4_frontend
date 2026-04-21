import { useNavigate } from "react-router-dom";
import { Formulario } from "../components/Formulario";
import type { IUsuario } from "../types/usuario";
import { MensajeError } from "../components/MensajeError";
import { useParticipantes } from "../context/ParticipantesContext";
import { toast } from "sonner";

export const FormularioRegistro = () => {
  const navigate = useNavigate();
  const { opciones, loadingOpciones, errorOpciones, agregarParticipante } =
    useParticipantes();

  const handleGuardarUsuario = async (datosNuevos: IUsuario) => {
    try {
      const usuarioRegistrado = await agregarParticipante(datosNuevos);
      toast.success(
        `Usuario ${usuarioRegistrado.nombre} registrado exitosamente`,
      );
      navigate("/");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error inesperado";
      toast.error(message);
    }
  };

  if (errorOpciones) {
    return (
      <MensajeError
        titulo="Error al cargar las opciones"
        mensaje={errorOpciones}
      />
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100 min-h-[125]">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b border-gray-200 pb-3">
          Registro de Participante
        </h2>
      </div>

      {loadingOpciones && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      )}

      {!loadingOpciones && opciones && (
        <Formulario onSubmit={handleGuardarUsuario} opciones={opciones} />
      )}
    </div>
  );
};
