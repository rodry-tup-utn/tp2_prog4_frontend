import type { ApiAction, ApiState } from "../types/apiTypes";

export function apiReducer(state: ApiState, action: ApiAction): ApiState {
  switch (action.type) {
    case "FETCH_PARTICIPANTES_SUCCESS":
      return {
        ...state,
        loadingParticipantes: false,
        participantes: action.payload,
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
        participantes: [...state.participantes, action.payload],
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

    default:
      return state;
  }
}
