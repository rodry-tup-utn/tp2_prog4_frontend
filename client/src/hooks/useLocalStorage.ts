import { useEffect, useState } from "react";
import type { IUsuario } from "../types/usuario";
import { Participante } from "../models/Participante";
import { toast } from "sonner";

export const useLocalStorage = () => {
  const [participantesLocal, setParticipantesLocal] = useState<IUsuario[]>([]);

  useEffect(() => {
    const cargarParticipantesLocal = async () => {
      try {
        const datosLocales = localStorage.getItem("participantes");

        if (datosLocales) {
          const parseados = JSON.parse(datosLocales);
          const instancias = parseados.map(
            (p: any) =>
              new Participante(
                p.id,
                p.nombre,
                p.email,
                p.edad,
                p.pais,
                p.modalidad,
                p.tecnologias,
                p.nivel,
                p.acepta_terminos,
              ),
          );
          setParticipantesLocal(instancias);
        }
      } catch (error) {
        toast.error("LocalStorage corrupto se reiniciaron los datos");
        localStorage.removeItem("participantes");
        setParticipantesLocal([]);
        console.error("Error:", error);
      }
    };
    cargarParticipantesLocal();
  }, []);

  const agregarParticipanteLocal = (data: IUsuario) => {
    try {
      const nuevoParticipante = new Participante(
        Date.now(),
        data.nombre,
        data.email,
        data.edad,
        data.pais,
        data.modalidad,
        data.tecnologias,
        data.nivel,
        data.acepta_terminos,
      );

      const nuevaLista = [...participantesLocal, nuevoParticipante];

      setParticipantesLocal(nuevaLista);
      localStorage.setItem("participantes", JSON.stringify(nuevaLista));
      toast.success("Participante agregado!");
      return true;
    } catch (error) {
      console.log("Error al guardar el participante", error);
      toast.error("Error al guardar el participante");
      return false;
    }
  };

  const quitarParticipanteLocal = (participante: IUsuario) => {
    const nuevalista = participantesLocal.filter(
      (p) => p.id !== participante.id,
    );
    toast(
      `¿Seguro que querés eliminar este participante ${participante.nombre}?`,
      {
        action: {
          label: "Eliminar",
          onClick: () => {
            setParticipantesLocal(nuevalista);
            localStorage.setItem("participantes", JSON.stringify(nuevalista));
          },
        },
        cancel: {
          label: "Cancelar",
          onClick: () => {},
        },
      },
    );
  };

  return {
    participantesLocal,
    agregarParticipanteLocal,
    quitarParticipanteLocal,
  };
};
