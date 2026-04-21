import type { IOpciones } from "../types/opciones";
import type { IUsuario } from "../types/usuario";

const API_URL = "http://localhost:8000";

export const api = {
  obtenerOpciones: async (): Promise<IOpciones> => {
    const res = await fetch(`${API_URL}/data/opciones`);
    if (!res.ok)
      throw new Error("Error al obtener las opciones del formulario");
    return res.json();
  },

  obtenerUsuarios: async (): Promise<IUsuario[]> => {
    const res = await fetch(`${API_URL}/usuarios/`);
    if (!res.ok)
      throw new Error(
        "Error al obtener los usuarios registrados del formulario",
      );
    return res.json();
  },
  obtenerUsuarioPorId: async (idUsuario: string): Promise<IUsuario> => {
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

  eliminarUsuario: async (usuario_id: string): Promise<IUsuario> => {
    const response = await fetch(`${API_URL}/usuarios/${usuario_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al eliminar el usuario");
    }

    return response.json();
  },
};
