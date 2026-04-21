import { useEffect, useReducer } from "react";
import type { IUsuario } from "../types/usuario";
import { api } from "../services/api";
import { apiReducer } from "../reducers/apiREducer";
import type { ApiState } from "../types/apiTypes";

export const initialState: ApiState = {
  participantes: [],
  loadingParticipantes: true,
  errorParticipantes: null,
  opciones: null,
  loadingOpciones: true,
  errorOpciones: null,
};
export const useApi = () => {
  const [state, dispatch] = useReducer(apiReducer, initialState);
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [usuarios, opciones] = await Promise.all([
          api.obtenerUsuarios(),
          api.obtenerOpciones(),
        ]);

        dispatch({
          type: "FETCH_PARTICIPANTES_SUCCESS",
          payload: usuarios,
        });

        dispatch({
          type: "FETCH_OPCIONES_SUCCESS",
          payload: opciones,
        });
      } catch (error: unknown) {
        const mensaje =
          error instanceof Error
            ? error.message
            : "Error al cargar datos iniciales";

        console.error("Error inicial:", error);

        dispatch({
          type: "FETCH_PARTICIPANTES_ERROR",
          payload: mensaje,
        });

        dispatch({
          type: "FETCH_OPCIONES_ERROR",
          payload: mensaje,
        });
      }
    };

    cargarDatosIniciales();
  }, []);
  const agregarParticipante = async (data: IUsuario): Promise<IUsuario> => {
    try {
      const nuevoParticipante = await api.registrarUsuario(data);
      dispatch({ type: "AGREGAR_PARTICIPANTE", payload: nuevoParticipante });
      return nuevoParticipante;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo agregar el participante");
    }
  };
  const eliminarParticipante = async (idUsuario: number): Promise<IUsuario> => {
    try {
      const eliminado = await api.eliminarUsuario(idUsuario.toString());
      if (!eliminado.id) throw new Error("Usuario sin id");
      dispatch({ type: "ELIMINAR_PARTICIPANTE", payload: eliminado.id });
      return eliminado;
    } catch (error) {
      throw error;
    }
  };

  return {
    participantes: state.participantes,
    agregarParticipante,
    eliminarParticipante,
    loadingParticipantes: state.loadingParticipantes,
    errorParticipantes: state.errorParticipantes,
    opciones: state.opciones,
    errorOpciones: state.errorOpciones,
    loadingOpciones: state.loadingOpciones,
  };
};
