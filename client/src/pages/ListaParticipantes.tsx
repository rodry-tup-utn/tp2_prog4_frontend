import { useState } from "react";
import { FilaParticipante } from "../components/FilaParticipante";
import { useApi } from "../hooks/useApi";
import { FiltroParticipantes } from "../components/FiltroParticipantes";
import { useFiltros } from "../hooks/useFiltros";
import { CardParticipante } from "../components/CardParticipante";
import type { IUsuario } from "../types/usuario";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "sonner";
import { ToggleModo } from "../components/ToggleModo";
import { MensajeError } from "../components/MensajeError";
import { SpanTotal } from "../components/SpanTotal";

export const ListaParticipantes = () => {
  const {
    participantes,
    loadingParticipantes,
    errorParticipantes,
    opciones,
    errorOpciones,
  } = useApi();
  const { participantesLocal, quitarParticipanteLocal } = useLocalStorage();
  const [vista, setVista] = useState("tarjetas");
  const [modo, setModo] = useState("local");

  const participantesUsados =
    modo === "api" ? participantes : participantesLocal;

  const { filtros, setFiltros, participantesFiltrados } =
    useFiltros(participantesUsados);

  const handleEliminarParticipante = (participante: IUsuario) => {
    modo === "local"
      ? quitarParticipanteLocal(participante)
      : toast.warning(
          "Funcion para borrar en base de datos próxima a desarrollar",
        );
  };

  if (loadingParticipantes) {
    return <div className="text-center py-10">Cargando lista...</div>;
  }
  if (errorOpciones)
    return (
      <MensajeError
        titulo="Error al cargar las opciones"
        mensaje={errorOpciones}
      />
    );

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-3 max-w-7xl mx-auto">
      <div className="flex justify-around mb-6">
        <ToggleModo
          titulo="Modo Offline"
          modoActual={modo}
          cambiarModo={setModo}
          modoUno="api"
          modoDos="local"
          estiloActivo="bg-purple-700 text-white shadow-sm"
          modoUnoLabel="Modo API"
          modoDosLabel="Modo Local"
        />

        <ToggleModo
          titulo="Cambiar Vista"
          cambiarModo={setVista}
          modoActual={vista}
          estiloActivo="bg-teal-800 text-white shadow-sm"
          modoUno="tabla"
          modoUnoLabel="Tabla"
          modoDos="tarjetas"
          modoDosLabel="Tarjetas"
        />
      </div>
      <div className="bg-blue-900 rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center justify-around gap-4">
        <h2 className="text-2xl font-bold text-white">Participantes</h2>

        <div className="flex gap-3">
          <SpanTotal
            label="Total"
            valor={participantesUsados.length}
            color="blue"
          />
          <SpanTotal
            label="Filtrados"
            valor={participantesFiltrados.length}
            color="teal"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {opciones && (
          <FiltroParticipantes
            filtros={filtros}
            opciones={opciones}
            setFiltros={setFiltros}
          />
        )}
        {vista === "tabla" && (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Edad</th>
                <th className="px-6 py-4">País</th>
                <th className="px-6 py-4">Tecnologías</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {participantesFiltrados.length > 0 &&
                participantesFiltrados.map((p) => (
                  <FilaParticipante key={p.id} participante={p} />
                ))}
              !
              {!loadingParticipantes && !errorParticipantes && (
                <div className="p-6 text-gray-600 italic text-center">
                  No se encontraron participantes con esos filtros
                </div>
              )}
            </tbody>
          </table>
        )}
        {vista == "tarjetas" && (
          <>
            {participantesFiltrados.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {participantesFiltrados.map((participante) => (
                  <CardParticipante
                    key={participante.id}
                    participante={participante}
                    handleEliminarParticipante={handleEliminarParticipante}
                  />
                ))}
              </div>
            )}
            {!loadingParticipantes && !errorParticipantes && (
              <div className="p-6 text-gray-600 italic text-center">
                No se encontraron participantes con esos filtros
              </div>
            )}
            {errorParticipantes &&
              (modo === "api" ? (
                <MensajeError
                  titulo="Error al conectarse con la API"
                  mensaje={errorParticipantes}
                />
              ) : (
                <div className="p-6 text-gray-600 italic text-center">
                  No se encontraron participantes con esos filtros
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};
