import { Formulario } from "../components/Formulario";
import { MensajeError } from "../components/MensajeError";
import { useParticipanteRegistro } from "../hooks/useParticipanteRegistro";

export const FormularioRegistro = () => {
  const {
    isEditing,
    loading,
    error,
    opciones,
    participanteEdicion,
    handleGuardar,
  } = useParticipanteRegistro();

  if (error) {
    return <MensajeError titulo="Error al cargar datos" mensaje={error} />;
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100 min-h-[125]">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b border-gray-200 pb-3">
        {isEditing ? "Editar Participante" : "Registro de Participante"}
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : (
        opciones && (
          <Formulario
            onSubmit={handleGuardar}
            opciones={opciones}
            datosFormulario={participanteEdicion}
          />
        )
      )}
    </div>
  );
};
