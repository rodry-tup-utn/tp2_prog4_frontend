interface Props {
  titulo: string;
  modoActual: string;
  modoUno: string;
  modoUnoLabel: string;
  modoDos: string;
  modoDosLabel: string;
  estiloActivo: string;
  cambiarModo: (nuevoModo: string) => void;
}

export const ToggleModo = ({
  titulo,
  estiloActivo,
  modoActual,
  modoUno,
  modoUnoLabel,
  modoDos,
  modoDosLabel,
  cambiarModo,
}: Props) => {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
          {titulo}
        </label>

        <div className="flex justify-between">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => cambiarModo(modoUno)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                modoActual === modoUno
                  ? estiloActivo
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/60"
              }`}
            >
              {modoUnoLabel}
            </button>

            <button
              onClick={() => cambiarModo(modoDos)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                modoActual === modoDos
                  ? estiloActivo
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/60"
              }`}
            >
              {modoDosLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
