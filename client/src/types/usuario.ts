export interface IUsuario {
  id?: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: string;
  tecnologias: string[];
  nivel: string;
  acepta_terminos: boolean;
}
