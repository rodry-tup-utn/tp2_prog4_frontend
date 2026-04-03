interface StatProps {
  label: string;
  valor: number;
  color?: "blue" | "teal" | "purple";
}

export const SpanTotal = ({ label, valor, color = "blue" }: StatProps) => {
  const colors = {
    blue: "bg-blue-500/20 border-blue-500/50 text-blue-100",
    teal: "bg-teal-500/20 border-teal-500/50 text-teal-100",
    purple: "bg-purple-500/20 border-purple-500/50 text-purple-100",
  };

  return (
    <div
      className={`border px-4 py-2 rounded-xl text-center min-w-25 ${colors[color]}`}
    >
      <p className="text-[10px] uppercase font-black tracking-widest opacity-80">
        {label}
      </p>
      <p className="text-xl font-black">{valor}</p>
    </div>
  );
};
