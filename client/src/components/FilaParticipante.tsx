import { useNavigate } from "react-router-dom";
import type { IUsuario } from "../types/usuario";
import { useAuth } from "../context/AuthContext";

interface Props {
  participante: IUsuario;
  handleEliminarParticipante?(participante: IUsuario): void;
}

export const FilaParticipante = ({ participante, handleEliminarParticipante }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

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
      {isAdmin && (
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/participante/${participante.id}`)}
              className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-teal-900 transition"
            >
              Editar
            </button>
            {handleEliminarParticipante && (
              <button
                onClick={() => handleEliminarParticipante(participante)}
                className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-800 transition"
              >
                Eliminar
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};
