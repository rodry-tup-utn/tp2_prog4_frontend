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

  // Esta constante se recalcula mágicamente cada vez que tocas un filtro
  const participantesFiltrados = usuariosOriginales.filter((usuario) => {
    // 1. Filtro de Texto (pasamos todo a minúsculas para que "Juan" y "juan" coincidan)
    const coincideNombre = usuario.nombre
      .toLowerCase()
      .includes(filtros.busqueda.toLowerCase());

    // 2. Filtros Select (Si el filtro está en "", da true y deja pasar a todos. Si tiene valor, debe coincidir exactamente)
    const coincideModalidad =
      filtros.modalidad === "" || usuario.modalidad === filtros.modalidad;

    const coincideNivel =
      filtros.nivel === "" || usuario.nivel === filtros.nivel;

    // 3. Filtro de Array (Verificamos si el array de tecnologías del usuario incluye la que buscamos)
    const coincideTech =
      filtros.tecnologia === "" ||
      usuario.tecnologias.includes(filtros.tecnologia);

    // El usuario sobrevive al filtro SOLO si cumple con TODAS las condiciones a la vez
    return coincideNombre && coincideModalidad && coincideNivel && coincideTech;
  });

  return { filtros, setFiltros, participantesFiltrados };
};
