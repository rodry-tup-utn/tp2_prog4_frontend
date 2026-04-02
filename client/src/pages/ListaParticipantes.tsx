import { useState } from "react";
import { FilaParticipante } from "../components/FilaParticipante";
import { useApi } from "../hooks/useApi";
import { FiltroParticipantes } from "../components/FiltroParticipantes";
import { useFiltros } from "../hooks/useFiltros";
import { CardParticipante } from "../components/CardParticipante";
import type { IUsuario } from "../types/usuario";

export const ListaParticipantes = () => {
  const {
    participantes,
    setParticipantes,
    loadingParticipantes,
    errorParticipantes,
    opciones,
    errorOpciones,
  } = useApi();
  const [vista, setVista] = useState<"tarjetas" | "tabla">("tarjetas");
  const { filtros, setFiltros, participantesFiltrados } =
    useFiltros(participantes);

  //Eliminacion de participante en memoria, no en persistencia de base de datos, al refrescar pagina vuelve a aparecer
  const eliminarParticipante = (participante: IUsuario) => {
    const nuevalista = participantesFiltrados.filter(
      (p) => p.id !== participante.id,
    );
    if (confirm(`Desea eliminar al usuario ${participante.nombre}?`))
      setParticipantes(nuevalista);
  };

  if (loadingParticipantes) {
    return <div className="text-center py-10">Cargando lista...</div>;
  }

  if (errorParticipantes || errorOpciones) {
    return (
      <div className="text-2xl bg-red-100 rounded-2xl text-center py-10 text-red-600">
        Error al cargar participantes: {errorParticipantes}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-3">
      <div className="flex justify-end mb-6">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setVista("tarjetas")}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              vista === "tarjetas"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/60"
            }`}
          >
            Tarjetas
          </button>

          <button
            onClick={() => setVista("tabla")}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              vista === "tabla"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/60"
            }`}
          >
            Tabla
          </button>
        </div>
      </div>
      <div className="p-6 bg-blue-900 rounded-xl flex flex-row items-center justify-around">
        <h2 className="text-xl font-bold text-white">Participantes</h2>
        <p className="p-3 rounded-2xl bg-blue-500 text-white font-bold">
          Total registrados:{participantes.length}
        </p>
        <p className="p-3 rounded-2xl bg-blue-500 text-white font-bold">
          Total mostrados: {participantesFiltrados.length}{" "}
        </p>
      </div>

      <div className="overflow-x-auto">
        <FiltroParticipantes
          filtros={filtros}
          opciones={opciones!}
          setFiltros={setFiltros}
        />
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
              {participantesFiltrados.length > 0 ? (
                participantesFiltrados.map((p) => (
                  <FilaParticipante key={p.id} participante={p} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500 italic"
                  >
                    No hay participantes registrados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        {vista == "tarjetas" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {participantesFiltrados.map((participante) => (
              <CardParticipante
                key={participante.id || participante.nombre}
                participante={participante}
                handleEliminarParticipante={eliminarParticipante}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
