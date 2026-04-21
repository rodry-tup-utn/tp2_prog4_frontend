import type { IOpciones } from "./opciones";
import type { IUsuario } from "./usuario";

export type ApiAction =
  | { type: "AGREGAR_PARTICIPANTE"; payload: IUsuario }
  | { type: "ELIMINAR_PARTICIPANTE"; payload: number }
  | { type: "FETCH_PARTICIPANTES_SUCCESS"; payload: IUsuario[] }
  | { type: "FETCH_PARTICIPANTES_ERROR"; payload: string }
  | { type: "SET_PARTICIPANTES"; payload: IUsuario[] } // Para mantener tu función exportada
  | { type: "FETCH_OPCIONES_SUCCESS"; payload: IOpciones }
  | { type: "FETCH_OPCIONES_ERROR"; payload: string };

export interface ApiState {
  participantes: IUsuario[];
  loadingParticipantes: boolean;
  errorParticipantes: string | null;
  opciones: IOpciones | null;
  loadingOpciones: boolean;
  errorOpciones: string | null;
}
