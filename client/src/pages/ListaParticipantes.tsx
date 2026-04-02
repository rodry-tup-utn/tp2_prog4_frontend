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

        {participantesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {participantesFiltrados.map((participante) => (
              <CardParticipante
                key={participante.id || participante.nombre}
                participante={participante}
                handleEliminarParticipante={eliminarParticipante}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 text-gray-600 italic text-center">
            No se encontraron participantes
          </div>
        )}
      </div>
    </div>
  );
};
