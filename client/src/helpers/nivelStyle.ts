export const getNivelColor = (nivel: string): string => {
  if (nivel.toLowerCase() == "principiante") return "bg-green-600 text-white";
  if (nivel.toLowerCase() == "intermedio") return "bg-orange-500 text-white";
  if (nivel.toLowerCase() == "avanzado") return "bg-red-600 text-white";

  return "bg-grey-400";
};
