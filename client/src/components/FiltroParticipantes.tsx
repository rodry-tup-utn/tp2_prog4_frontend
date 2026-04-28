import { useFiltros } from "../context/FiltrosContext";
import type { IOpciones } from "../types/opciones";

interface Props {
  opciones: IOpciones;
}

export const FiltroParticipantes = ({ opciones }: Props) => {
  if (!opciones) return null;
  const { filtros, setFiltros } = useFiltros();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };
  const handleEliminarFiltros = () => {
    setFiltros({ busqueda: "", modalidad: "", nivel: "", tecnologia: "" });
  };

  const selectClass =
    "border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all";

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-100">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          Buscar por nombre
        </label>
        <input
          type="text"
          name="busqueda"
          value={filtros.busqueda}
          onChange={handleChange}
          placeholder="Ej: Juan Perez..."
          className={selectClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          Modalidad
        </label>
        <select
          name="modalidad"
          value={filtros.modalidad}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Todas</option>
          {opciones.modalidades.map((m: string) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          Nivel
        </label>
        <select
          name="nivel"
          value={filtros.nivel}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Todos</option>
          {opciones.niveles.map((n: any) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro Tecnología */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          Tecnología
        </label>
        <select
          name="tecnologia"
          value={filtros.tecnologia}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Todas</option>
          {opciones.tecnologias.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          Eliminar Filtros
        </label>
        <div className="flex justify-center">
          <button
            className="bg-teal-700 text-white tracking-wider rounded-xl py-2 px-6 hover:cursor-pointer transform ease-in-out hover:bg-teal-800"
            onClick={() => handleEliminarFiltros()}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};
