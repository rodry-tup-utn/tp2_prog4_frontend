import React, { useState } from "react";
import type { IFiltros } from "../types/apiTypes";
import type { IOpciones } from "../types/opciones";

interface Props {
  opciones: IOpciones;
  filtros: IFiltros;
  setFiltros: (filtros: IFiltros) => void;
}

export const FiltroParticipantes = ({
  opciones,
  filtros,
  setFiltros,
}: Props) => {
  const [draft, setDraft] = useState<IFiltros>(filtros);

  if (!opciones) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setDraft((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFiltros(draft);
  };

  const handleEliminarFiltros = () => {
    const empty = { busqueda: "", modalidad: "", nivel: "", tecnologia: "" };
    console.log(empty);
    setDraft(empty);
    setFiltros(empty);
  };

  const selectClass =
    "border border-gray-200 rounded-xl p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all";
  const btnClass =
    "bg-blue-700 text-white tracking-wider rounded-xl py-2.5 px-6 hover:cursor-pointer transform ease-in-out hover:bg-blue-800 font-semibold text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-100"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          Buscar por nombre
        </label>
        <input
          type="text"
          name="busqueda"
          value={draft.busqueda}
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
          value={draft.modalidad}
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
          value={draft.nivel}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="">Todos</option>
          {opciones.niveles.map((n: string) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          Tecnología
        </label>
        <select
          name="tecnologia"
          value={draft.tecnologia}
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
          Acciones
        </label>
        <div className="flex gap-2">
          <button type="submit" className={btnClass}>
            Buscar
          </button>
          <button
            type="button"
            className="bg-teal-700 text-white tracking-wider rounded-xl py-2.5 px-4 hover:cursor-pointer transform ease-in-out hover:bg-teal-800 font-semibold text-sm"
            onClick={handleEliminarFiltros}
          >
            Limpiar
          </button>
        </div>
      </div>
    </form>
  );
};
