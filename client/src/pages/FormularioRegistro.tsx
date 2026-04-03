import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ToggleModo } from "../components/ToggleModo";
import { Formulario } from "../components/Formulario";
import type { IUsuario } from "../types/usuario";
import { MensajeError } from "../components/MensajeError";

export const FormularioRegistro = () => {
  const navigate = useNavigate();
  const { opciones, loadingOpciones, errorOpciones } = useApi();
  const { agregarParticipanteLocal } = useLocalStorage();
  const { agregarParticipanteApi } = useApi();
  const [modo, setModo] = useState("local");

  const handleGuardarUsuario = async (datosNuevos: IUsuario) => {
    let registrado = false;
    if (modo === "local") {
      registrado = agregarParticipanteLocal(datosNuevos);
    } else {
      registrado = await agregarParticipanteApi(datosNuevos);
    }
    if (registrado) navigate("/participantes");
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
        <ToggleModo
          titulo="Modo Offline"
          cambiarModo={setModo}
          modoActual={modo}
          estiloActivo="bg-purple-700 text-white shadow-sm"
          modoUno="local"
          modoUnoLabel="Modo Local"
          modoDos="api"
          modoDosLabel="Modo API"
        />
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
