export const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-teal-800 text-blue-200 py-3 mt-12 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-row justify-around items-center">
        <p className="font-bold text-white tracking-wide">
          &copy; {anioActual} - Ramirez Rodrigo
        </p>
        <p className="text-blue-300">Trabajo Práctico N° 2 - Frontend</p>
        <p className="font-medium text-blue-400 mt-1">Comisión 2</p>
      </div>
    </footer>
  );
};
