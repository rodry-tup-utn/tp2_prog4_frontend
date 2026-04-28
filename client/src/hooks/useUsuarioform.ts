import { useState, useEffect } from "react";
import type { IUsuario } from "../types/usuario";

export const useUsuarioForm = (
  initialData: IUsuario | null,
  emptyState: IUsuario,
) => {
  const [formData, setFormData] = useState<IUsuario>(initialData ?? emptyState);

  useEffect(() => {
    setFormData(initialData ?? emptyState);
  }, [initialData, emptyState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleTechChange = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      tecnologias: prev.tecnologias.includes(tech)
        ? prev.tecnologias.filter((t) => t !== tech)
        : [...prev.tecnologias, tech],
    }));
  };

  return { formData, handleChange, handleTechChange };
};
