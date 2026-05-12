import type { IOpciones } from "../types/opciones";
import type { IUsuario } from "../types/usuario";
import { useUsuarioForm } from "../hooks/useUsuarioform";

interface Props {
  opciones: IOpciones;
  onSubmit: (data: IUsuario) => void;
  datosFormulario: IUsuario | null;
}

//objeto vacio predeterminado
const PARTICIPANTE_VACIO: IUsuario = {
  nombre: "",
  email: "",
  edad: 12,
  pais: "",
  modalidad: "",
  nivel: "",
  tecnologias: [],
  acepta_terminos: false,
};
export const Formulario = ({ opciones, onSubmit, datosFormulario }: Props) => {
  const { formData, handleChange, handleTechChange } = useUsuarioForm(
    datosFormulario,
    PARTICIPANTE_VACIO,
  );

  const labelClass = "text-sm font-semibold text-gray-700";
  const inputClass =
    "border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";
  const selectClass =
    "border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-700";

  const handleRegistrarUsuario = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={handleRegistrarUsuario}
    >
      {/* Para proxima funcionalidad de edicion */}
      {formData.id && (
        <div className="md:col-span-2 mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            ID del Participante:{" "}
            <span className="text-gray-900 ml-1">{formData.id}</span>
          </p>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Nombre Completo</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Juan Perez"
          onChange={handleChange}
          id="nombre"
          name="nombre"
          value={formData.nombre}
          required
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
          onChange={handleChange}
          value={formData.email}
          required
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
          onChange={handleChange}
          value={formData.edad}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className={labelClass}>País</label>
        <select
          className={selectClass}
          onChange={handleChange}
          id="pais"
          name="pais"
          value={formData.pais}
          required
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
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                required
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
          onChange={handleChange}
          id="nivel"
          name="nivel"
          value={formData.nivel}
          required
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
                id="tecnologias"
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
          onChange={handleChange}
          required
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
          {datosFormulario ? "Editar Participante" : "Registrar Participante"}
        </button>
      </div>
    </form>
  );
};
