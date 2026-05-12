import type { IOpciones } from "../types/opciones";
import type { IUsuario, IUsuarioList } from "../types/usuario";

const API_URL = "http://localhost:8000";

export const api = {
  obtenerOpciones: async (): Promise<IOpciones> => {
    const res = await fetch(`${API_URL}/data/opciones`);
    if (!res.ok)
      throw new Error("Error al obtener las opciones del formulario");
    return res.json();
  },

  obtenerUsuarios: async (
    offset: number = 0,
    limit: number = 8,
    filtros?: {
      busqueda?: string;
      modalidad?: string;
      nivel?: string;
      tecnologia?: string;
    },
  ): Promise<IUsuarioList> => {
    const params = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
    });
    if (filtros?.busqueda) params.append("busqueda", filtros.busqueda);
    if (filtros?.modalidad) params.append("modalidad", filtros.modalidad);
    if (filtros?.nivel) params.append("nivel", filtros.nivel);
    if (filtros?.tecnologia) params.append("tecnologia", filtros.tecnologia);
    const res = await fetch(`${API_URL}/usuarios/?${params}`);
    if (!res.ok)
      throw new Error(
        "Error al obtener los usuarios registrados del formulario",
      );
    return res.json();
  },
  obtenerUsuarioPorId: async (idUsuario: number): Promise<IUsuario> => {
    const res = await fetch(`${API_URL}/usuarios/${idUsuario}`);
    if (!res.ok) throw new Error(`Error al obtener el usuario ${idUsuario}`);
    return res.json();
  },

  registrarUsuario: async (
    usuario: Omit<IUsuario, "id">,
  ): Promise<IUsuario> => {
    const response = await fetch(`${API_URL}/usuarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al registrar participante");
    }

    return response.json();
  },

  eliminarUsuario: async (usuario_id: string): Promise<boolean> => {
    const response = await fetch(`${API_URL}/usuarios/${usuario_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al eliminar el usuario");
    }
    return true;
  },
  actualizarUsuario: async (
    usuarioId: number,
    data: IUsuario,
  ): Promise<IUsuario> => {
    const response = await fetch(`${API_URL}/usuarios/${usuarioId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al registrar participante");
    }

    return response.json();
  },
};
