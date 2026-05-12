import type { ApiAction, IFiltros } from "../types/apiTypes";
import type { IOpciones } from "../types/opciones";
import type { IUsuario } from "../types/usuario";
export const initialState = {
  participantes: [] as IUsuario[],
  total: 0,
  loadingParticipantes: true,
  errorParticipantes: null as string | null,
  opciones: {} as IOpciones,
  loadingOpciones: true,
  errorOpciones: null as string | null,
  offset: 0,
  limit: 8,
  filtros: {} as IFiltros,
};

export type ApiState = typeof initialState;

export function apiReducer(state: ApiState, action: ApiAction): ApiState {
  switch (action.type) {
    case "FETCH_PARTICIPANTES_SUCCESS":
      return {
        ...state,
        loadingParticipantes: false,
        participantes: action.payload.data,
        total: action.payload.total,
      };
    case "FETCH_PARTICIPANTES_ERROR":
      return {
        ...state,
        loadingParticipantes: false,
        errorParticipantes: action.payload,
      };

    case "AGREGAR_PARTICIPANTE":
      return {
        ...state,
        total: state.total + 1,
        participantes: action.payload,
      };

    case "MODIFICAR_PARTICIPANTE":
      return {
        ...state,
        participantes: state.participantes.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case "FETCH_OPCIONES_SUCCESS":
      return { ...state, loadingOpciones: false, opciones: action.payload };
    case "FETCH_OPCIONES_ERROR":
      return {
        ...state,
        loadingOpciones: false,
        errorOpciones: action.payload,
      };

    case "ELIMINAR_PARTICIPANTE":
      return {
        ...state,
        participantes: state.participantes.filter(
          (p) => p.id !== action.payload,
        ),
      };

    case "SET_OFFSET":
      return {
        ...state,
        offset: action.payload,
        loadingParticipantes: true,
      };

    case "SET_FILTROS":
      return {
        ...state,
        filtros: action.payload,
        offset: 0,
        loadingParticipantes: true,
      };

    default:
      return state;
  }
}
