import { useState } from "react";
import { Link } from "react-router-dom";
import { FilaParticipante } from "../components/FilaParticipante";
import { FiltroParticipantes } from "../components/FiltroParticipantes";
import { CardParticipante } from "../components/CardParticipante";
import type { IUsuario } from "../types/usuario";
import { toast } from "sonner";
import { ToggleModo } from "../components/ToggleModo";
import { MensajeError } from "../components/MensajeError";
import { SpanTotal } from "../components/SpanTotal";
import { useParticipantes } from "../context/ParticipantesContext";
import { useAuth } from "../context/AuthContext";

export const ListaParticipantes = () => {
  const {
    participantes,
    total,
    opciones,
    loadingParticipantes,
    errorParticipantes,
    errorOpciones,
    loadingOpciones,
    eliminarParticipante,
    siguientePagina,
    anteriorPagina,
    offset,
    limit,
    filtros,
    setFiltros,
  } = useParticipantes();

  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [vista, setVista] = useState("tarjetas");

  const paginaActual = Math.floor(offset / limit) + 1;
  const esPrimeraPagina = offset === 0;
  const esUltimaPagina = offset + limit >= total;

  const handleEliminarParticipante = (participante: IUsuario) => {
    toast(`¿Eliminar participante ${participante.nombre}?`, {
      action: {
        label: "Sí, eliminar",
        onClick: async () => {
          try {
            await eliminarParticipante(participante.id!);
            toast.success(`Participante ${participante.nombre} eliminado`);
          } catch (error: any) {
            toast.error(error.message || "No se pudo eliminar el usuario");
          }
        },
      },
      cancel: { label: "Cancelar", onClick: () => {} },
    });
  };

  if (loadingParticipantes && participantes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        <p className="text-gray-600 font-medium">Cargando participantes...</p>
      </div>
    );
  }

  if (errorOpciones) {
    return (
      <MensajeError
        titulo="Error al cargar las opciones"
        mensaje={errorOpciones}
      />
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-3 max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
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
            label="En esta página"
            valor={participantes.length}
            color="blue"
          />
          <SpanTotal
            label="Filtrados"
            valor={total}
            color="teal"
          />
        </div>
        {isAdmin && (
          <Link
            to="/participante"
            className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold px-5 py-2 rounded-xl transition-all shadow-sm text-sm"
          >
            + Nuevo Participante
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        {opciones && !loadingOpciones && (
          <FiltroParticipantes
            opciones={opciones}
            filtros={filtros}
            setFiltros={setFiltros}
          />
        )}

        <div className="min-h-100">
          {vista === "tabla" ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Edad</th>
                  <th className="px-6 py-4">País</th>
                  <th className="px-6 py-4">Tecnologías</th>
                  {isAdmin && <th className="px-4 py-4">Acciones</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {participantes.map((p) => (
                  <FilaParticipante
                    key={p.id}
                    participante={p}
                    handleEliminarParticipante={handleEliminarParticipante}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {participantes.map((p) => (
                <CardParticipante
                  key={p.id}
                  participante={p}
                  handleEliminarParticipante={handleEliminarParticipante}
                />
              ))}
            </div>
          )}

          {!loadingParticipantes && participantes.length === 0 && (
            <div className="py-20 text-center text-gray-500 italic text-xl">
              No se encontraron participantes en esta página
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 py-8 border-t border-gray-100 mt-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => anteriorPagina()}
              disabled={esPrimeraPagina || loadingParticipantes}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all transform active:scale-95 ${
                esPrimeraPagina || loadingParticipantes
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-black shadow-md"
              }`}
            >
              Anterior
            </button>

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Página
              </span>
              <span className="text-xl font-black text-blue-900">
                {paginaActual}
              </span>
            </div>

            <button
              onClick={() => siguientePagina()}
              disabled={esUltimaPagina || loadingParticipantes}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all transform active:scale-95 ${
                esUltimaPagina || loadingParticipantes
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-md"
              }`}
            >
              {loadingParticipantes ? "..." : "Siguiente"}
            </button>
          </div>

          {loadingParticipantes && (
            <span className="text-xs text-blue-600 animate-pulse font-medium">
              Sincronizando con el servidor...
            </span>
          )}
        </div>

        {errorParticipantes && (
          <div className="mt-4">
            <MensajeError
              titulo="Error de conexión"
              mensaje={errorParticipantes}
            />
          </div>
        )}
      </div>
    </div>
  );
};
