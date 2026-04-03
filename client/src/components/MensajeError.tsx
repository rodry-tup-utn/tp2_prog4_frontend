interface Props {
  titulo?: string;
  mensaje: string;
}

export const MensajeError = ({ titulo = "Error de carga", mensaje }: Props) => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center gap-4">
      {/* Icono simple */}
      <span className="text-2xl text-red-500">⚠️</span>

      <div>
        <h3 className="font-bold text-red-800 leading-tight">{titulo}</h3>
        <p className="text-sm text-red-600 mt-1">{mensaje}</p>
      </div>
    </div>
  );
};
