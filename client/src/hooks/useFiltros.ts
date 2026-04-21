import { useState } from "react";
import type { IUsuario } from "../types/usuario";
import type { IFiltros } from "../types/filtros";

export const useFiltros = (usuariosOriginales: IUsuario[]) => {
  const [filtros, setFiltros] = useState<IFiltros>({
    busqueda: "",
    modalidad: "",
    nivel: "",
    tecnologia: "",
  });

  const participantesFiltrados = usuariosOriginales.filter((usuario) => {
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

    return coincideNombre && coincideModalidad && coincideNivel && coincideTech;
  });

  return { filtros, setFiltros, participantesFiltrados };
};
