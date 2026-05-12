import type { IOpciones } from "./opciones";
import type { IUsuario } from "./usuario";

export interface IFiltros {
  busqueda: string;
  modalidad: string;
  nivel: string;
  tecnologia: string;
}

export type ApiAction =
  | { type: "AGREGAR_PARTICIPANTE"; payload: IUsuario[] }
  | { type: "MODIFICAR_PARTICIPANTE"; payload: IUsuario }
  | { type: "ELIMINAR_PARTICIPANTE"; payload: number }
  | {
      type: "FETCH_PARTICIPANTES_SUCCESS";
      payload: { data: IUsuario[]; total: number };
    }
  | { type: "FETCH_PARTICIPANTES_ERROR"; payload: string }
  | { type: "FETCH_OPCIONES_SUCCESS"; payload: IOpciones }
  | { type: "FETCH_OPCIONES_ERROR"; payload: string }
  | { type: "SET_OFFSET"; payload: number }
  | { type: "SET_FILTROS"; payload: IFiltros };

export interface ApiState {
  participantes: IUsuario[];
  total: number;
  loadingParticipantes: boolean;
  errorParticipantes: string | null;
  opciones: IOpciones | null;
  loadingOpciones: boolean;
  errorOpciones: string | null;
  offset: number;
  limit: number;
  filtros: IFiltros;
}
