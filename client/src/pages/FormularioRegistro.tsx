import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { IUsuario } from "../types/usuario";
import { useApi } from "../hooks/useApi";

export const FormularioRegistro = () => {
  const navigate = useNavigate();
  const { opciones, loadingOpciones, errorOpciones } = useApi();

  const labelClass = "text-sm font-semibold text-gray-700";
  const inputClass =
    "border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";
  const selectClass =
    "border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-700";

  const [formData, setFormData] = useState<Omit<IUsuario, "id">>({
    nombre: "",
    email: "",
    edad: 12,
    pais: "",
    modalidad: "",
    nivel: "",
    tecnologias: [],
    acepta_terminos: false,
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    // capturamos el checked en vez del value en checkbox
    if (type === "checkbox" && name === "acepta_terminos") {
      setFormData((prev) => ({
        ...prev,
        acepta_terminos: (e.target as HTMLInputElement).checked,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (tech: string) => {
    setFormData((prev) => {
      const tieneTech = prev.tecnologias.includes(tech);
      return {
        ...prev,
        // Si ya la tiene, la saca. Si no la tiene, la agrega al array.
        tecnologias: tieneTech
          ? prev.tecnologias.filter((t) => t !== tech)
          : [...prev.tecnologias, tech],
      };
    });
  };

  const handleRegistrarUsuario = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await api.registrarUsuario(formData);
      alert("Usuario registrado con exito");
      navigate("/participantes");
    } catch (error) {
      console.error("No se pudo registrar el usuario", error);
      alert("Ocurrio un error al registrar al usuario");
    }
  };

  if (errorOpciones) {
    return (
      <div className="text-center font-semibold text-red-500 py-10">
        No se pudo conectar a la API. Verifica que tu backend esté corriendo.
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100 min-h-[125]">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b border-gray-200 pb-3">
        Registro de Participante
      </h2>

      {loadingOpciones && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      )}

      {!loadingOpciones && opciones && (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleRegistrarUsuario}
        >
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Nombre Completo</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Juan Perez"
              onChange={handleChangeInput}
              id="nombre"
              name="nombre"
              value={formData.nombre}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={inputClass}
              placeholder="correo@ejemplo.com"
              onChange={handleChangeInput}
              value={formData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Edad</label>
            <input
              type="number"
              name="edad"
              min="12"
              max="99"
              className={inputClass}
              placeholder="Ingresa tu edad"
              onChange={handleChangeInput}
              value={formData.edad}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>País</label>
            <select
              className={selectClass}
              onChange={handleChangeInput}
              id="pais"
              name="pais"
              value={formData.pais}
            >
              <option value="">Seleccione un país</option>
              {opciones.paises.map((pais) => {
                return (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Modalidad de asistencia</label>
            <div className="flex gap-4 mt-1">
              {opciones.modalidades.map((modalidad) => (
                <label
                  key={modalidad}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="modalidad"
                    value={modalidad}
                    checked={formData.modalidad === modalidad}
                    onChange={handleChangeInput}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {modalidad}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Nivel de Experiencia</label>
            <select
              className={selectClass}
              onChange={handleChangeInput}
              id="nivel"
              name="nivel"
              value={formData.nivel}
            >
              <option value="">Selecciona tu nivel</option>
              {opciones.niveles.map((nivel) => (
                <option value={nivel} key={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2 bg-blue-50 p-4 rounded-lg border border-gray-200 mt-2">
            <label className={labelClass}>Tecnologías de Interés</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {opciones.tecnologias.map((tecnologia) => (
                <label
                  key={tecnologia}
                  className="flex items-center gap-2 cursor-pointer hover:text-blue-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    id="terminos"
                    name="tecnologias"
                    onChange={() => handleTechChange(tecnologia)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer focus:ring-blue-500"
                    checked={formData.tecnologias.includes(tecnologia)}
                  />
                  <span className="font-medium">{tecnologia}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Términos */}
          <div className="md:col-span-2 flex items-center gap-3 mt-2 pl-1">
            <input
              type="checkbox"
              id="terminos"
              name="acepta_terminos"
              className="w-5 h-5 text-blue-600 rounded cursor-pointer focus:ring-blue-500"
              checked={formData.acepta_terminos}
              onChange={handleChangeInput}
            />
            <label
              htmlFor="terminos"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Acepto los términos y condiciones del evento
            </label>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold shadow-md transition-all"
            >
              Registrar Participante
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
