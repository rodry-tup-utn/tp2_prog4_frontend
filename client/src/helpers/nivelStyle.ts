export const getNivelColor = (nivel: string): string => {
  if (nivel.toLowerCase() == "principiante") return "bg-green-400 text-white";
  if (nivel.toLowerCase() == "intermedio") return "bg-orange-400 text-white";
  if (nivel.toLowerCase() == "avanzado") return "bg-red-500 text-white";

  return "bg-grey-400";
};
