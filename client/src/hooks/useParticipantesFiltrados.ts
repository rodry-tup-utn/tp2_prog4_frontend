import { useMemo } from "react";
import type { IUsuario } from "../types/usuario";
import { useFiltros } from "../context/FiltrosContext";

export const useParticipantesFiltrados = (usuarios: IUsuario[]) => {
  const { filtros } = useFiltros();

  const participantesFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const coincideNombre = usuario.nombre
        .toLowerCase()
        .includes(filtros.busqueda.toLowerCase());

      const coincideModalidad =
        filtros.modalidad === "" || usuario.modalidad === filtros.modalidad;

      const coincideNivel =
        filtros.nivel === "" || usuario.nivel === filtros.nivel;

      const coincideTech =
        filtros.tecnologia === "" ||
        usuario.tecnologias.includes(filtros.tecnologia);

      return (
        coincideNombre && coincideModalidad && coincideNivel && coincideTech
      );
    });
  }, [usuarios, filtros]);

  return { participantesFiltrados };
};
