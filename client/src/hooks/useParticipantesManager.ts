import { useCallback, useEffect, useReducer } from "react";
import type { IUsuario } from "../types/usuario";
import type { IFiltros } from "../types/apiTypes";
import { api } from "../services/api";
import { apiReducer, initialState } from "../reducers/apiReducer";

export const useParticipantesManager = () => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  const fetchParticipantes = useCallback(async () => {
    try {
      const { offset, limit, filtros } = state;
      const resultado = await api.obtenerUsuarios(offset, limit, filtros);

      dispatch({
        type: "FETCH_PARTICIPANTES_SUCCESS",
        payload: { data: resultado.data, total: resultado.total },
      });
    } catch (error) {
      dispatch({
        type: "FETCH_PARTICIPANTES_ERROR",
        payload: "Error al cargar participantes",
      });
    }
  }, [state.offset, state.limit, state.filtros]);

  useEffect(() => {
    fetchParticipantes();
  }, [fetchParticipantes]);

  useEffect(() => {
    api
      .obtenerOpciones()
      .then((opciones) =>
        dispatch({ type: "FETCH_OPCIONES_SUCCESS", payload: opciones }),
      )
      .catch((err: Error) =>
        dispatch({
          type: "FETCH_OPCIONES_ERROR",
          payload: err.message || "Error al cargar opciones",
        }),
      );
  }, []);

  const setFiltros = useCallback((filtros: IFiltros) => {
    dispatch({ type: "SET_FILTROS", payload: filtros });
  }, []);

  const agregarParticipante = useCallback(
    async (data: IUsuario): Promise<IUsuario> => {
      try {
        const nuevoParticipante = await api.registrarUsuario(data);
        const listaActualizada = await api.obtenerUsuarios(
          state.offset,
          state.limit,
        );
        dispatch({
          type: "AGREGAR_PARTICIPANTE",
          payload: listaActualizada.data,
        });
        return nuevoParticipante;
      } catch (error) {
        console.error(error);
        throw new Error("No se pudo agregar el participante");
      }
    },
    [],
  );

  const modificarParticipante = useCallback(
    async (data: IUsuario, usuarioId: number): Promise<IUsuario> => {
      try {
        const participanteActualizado = await api.actualizarUsuario(
          usuarioId,
          data,
        );
        dispatch({
          type: "MODIFICAR_PARTICIPANTE",
          payload: participanteActualizado,
        });
        return participanteActualizado;
      } catch (error) {
        console.error(error);
        throw new Error(`No se pudo modificar el participante ${data.nombre}`);
      }
    },
    [],
  );

  const eliminarParticipante = useCallback(
    async (idUsuario: number): Promise<boolean> => {
      try {
        const eliminado = await api.eliminarUsuario(idUsuario.toString());
        if (eliminado) {
          dispatch({ type: "ELIMINAR_PARTICIPANTE", payload: idUsuario });
          return true;
        }
        return false;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const cargarParticipantePorId = useCallback(
    async (idUsuario: number): Promise<IUsuario> => {
      return api.obtenerUsuarioPorId(idUsuario);
    },
    [],
  );

  const siguientePagina = useCallback(() => {
    dispatch({ type: "SET_OFFSET", payload: state.offset + state.limit });
  }, [state.offset, state.limit]);

  const anteriorPagina = useCallback(() => {
    dispatch({
      type: "SET_OFFSET",
      payload: Math.max(0, state.offset - state.limit),
    });
  }, [state.offset, state.limit]);

  return {
    participantes: state.participantes,
    total: state.total,
    loadingParticipantes: state.loadingParticipantes,
    errorParticipantes: state.errorParticipantes,
    opciones: state.opciones,
    errorOpciones: state.errorOpciones,
    loadingOpciones: state.loadingOpciones,
    offset: state.offset,
    limit: state.limit,
    filtros: state.filtros,
    setFiltros,
    agregarParticipante,
    modificarParticipante,
    eliminarParticipante,
    cargarParticipantePorId,
    siguientePagina,
    anteriorPagina,
  };
};
