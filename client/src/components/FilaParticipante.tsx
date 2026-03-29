import type { IUsuario } from "../types/usuario";

interface Props {
  participante: IUsuario;
}

export const FilaParticipante = ({ participante }: Props) => {
  return (
    <tr className="hover:bg-blue-50 transition-colors border-b border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {participante.nombre}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {participante.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {participante.edad}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
          {participante.pais}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        <div className="flex flex-wrap gap-1">
          {participante.tecnologias.map((tech) => (
            <span
              key={tech}
              className="bg-gray-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold"
            >
              {tech}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
};
