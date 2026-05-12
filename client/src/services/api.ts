import type { IOpciones } from "../types/opciones";
import type { IUsuario, IUsuarioList } from "../types/usuario";

const API_URL = "http://localhost:8000";

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Sesión expirada");
  }
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Error en la solicitud");
  }
  return res.json();
}

export const api = {
  login: async (username: string, password: string): Promise<{ access_token: string; token_type: string }> => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(res);
  },

  obtenerOpciones: async (): Promise<IOpciones> => {
    const res = await fetch(`${API_URL}/data/opciones`, { headers: getAuthHeaders() });
    return handleResponse(res);
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
    const params = new URLSearchParams({ offset: String(offset), limit: String(limit) });
    if (filtros?.busqueda) params.append("busqueda", filtros.busqueda);
    if (filtros?.modalidad) params.append("modalidad", filtros.modalidad);
    if (filtros?.nivel) params.append("nivel", filtros.nivel);
    if (filtros?.tecnologia) params.append("tecnologia", filtros.tecnologia);
    const res = await fetch(`${API_URL}/usuarios/?${params}`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },

  obtenerUsuarioPorId: async (idUsuario: number): Promise<IUsuario> => {
    const res = await fetch(`${API_URL}/usuarios/${idUsuario}`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },

  registrarUsuario: async (usuario: Omit<IUsuario, "id">): Promise<IUsuario> => {
    const res = await fetch(`${API_URL}/usuarios/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(usuario),
    });
    return handleResponse(res);
  },

  eliminarUsuario: async (usuario_id: string): Promise<boolean> => {
    const res = await fetch(`${API_URL}/usuarios/${usuario_id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    await handleResponse(res);
    return true;
  },

  actualizarUsuario: async (usuarioId: number, data: IUsuario): Promise<IUsuario> => {
    const res = await fetch(`${API_URL}/usuarios/${usuarioId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  registrarUsuarioAuth: async (data: { username: string; password: string; role: string }): Promise<{ id: number; username: string; role: string }> => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
};
