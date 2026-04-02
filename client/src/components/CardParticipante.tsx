import { getNivelColor } from "../helpers/nivelStyle";
import type { IUsuario } from "../types/usuario";

interface CardProps {
  participante: IUsuario;
  handleEliminarParticipante(participante: IUsuario): void;
}

export const CardParticipante = ({
  participante,
  handleEliminarParticipante,
}: CardProps) => {
  const inicial = participante.nombre.charAt(0).toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Cabecera: Avatar y Nombre */}
      <div className="flex items-center gap-4 mb-4">
        {/* Círculo del Avatar */}
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-indigo-700 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-inner">
          {inicial}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 leading-tight">
            {participante.nombre}
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            Inscripto como:
          </p>
        </div>
      </div>

      {/* Cuerpo: Detalles de Nivel y Modalidad */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-200 flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Modalidad:</span>
          <span className="font-semibold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">
            {participante.modalidad}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Nivel:</span>
          <span
            className={`font-semibold ${getNivelColor(participante.nivel)} px-2 py-1 tracking-wider rounded-xl border border-gray-200 shadow-sm`}
          >
            {participante.nivel}
          </span>
        </div>
      </div>

      {/* Footer: Tecnologías (Empujado hacia abajo con mt-auto por si los nombres son largos) */}
      <div className="mt-auto pt-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Stack Tecnológico
        </p>
        <div className="flex flex-wrap gap-1.5">
          {participante.tecnologias.length > 0 ? (
            participante.tecnologias.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100"
              >
                {tech}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400 italic">
              Sin tecnologías
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleEliminarParticipante(participante)}
          className="bg-red-500 text-white font-bold tracking-wider w-fit  py-2 px-4 rounded-2xl hover:bg-red-800 hover:cursor-pointer transition ease-in-out mt-3"
        >
          Eliminar participante
        </button>
      </div>
    </div>
  );
};
