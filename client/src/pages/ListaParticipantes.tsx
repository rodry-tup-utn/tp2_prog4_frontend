import { FilaParticipante } from "../components/FilaParticipante";
import { useApi } from "../hooks/useApi";

export const ListaParticipantes = () => {
  const { participantes, loadingParticipantes, errorParticipantes } = useApi();

  if (loadingParticipantes) {
    return <div className="text-center py-10">Cargando lista...</div>;
  }

  if (errorParticipantes) {
    return (
      <div className="text-2xl bg-red-100 rounded-2xl text-center py-10 text-red-600">
        Error al cargar participantes: {errorParticipantes}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="p-6 bg-blue-900">
        <h2 className="text-xl font-bold text-white">
          Participantes Registrados
        </h2>
      </div>

      <div className="overflow-x-auto">
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
              {participantes.length > 0 ? (
                participantes.map((p) => (
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

        {vista === " tarjetas" && ()}
      </div>
    </div>
  );
};
