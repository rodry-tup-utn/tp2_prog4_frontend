from sqlmodel import SQLModel
from typing import List
from enum import Enum
from pydantic import field_validator


class ModalidadEnum(str, Enum):
    PRESENCIAL = "Presencial"
    VIRTUAL = "Virtual"
    HIBRIDO = "Híbrido"


class TecnologiaEnum(str, Enum):
    REACT = "React"
    ANGLLAR = "Angular"
    VUE = "Vue"
    NODE = "Node"
    PYTHON = "Python"
    JAVA = "Java"


class NivelExpEnum(str, Enum):
    PRINCIPIANTE = "Principiante"
    INTERMEDIO = "Intermedio"
    AVANZADO = "Avanzado"


class PaisEnum(str, Enum):
    ARGENTINA = "Argentina"
    CHILE = "Chile"
    URUGUAY = "Uruguay"
    MEXICO = "Mexico"
    ESPAÑA = "España"


class UsuarioBase(SQLModel):
    nombre: str
    email: str
    edad: int
    pais: PaisEnum
    modalidad: ModalidadEnum
    tecnologias: List[TecnologiaEnum]
    nivel: NivelExpEnum
    acepta_terminos: bool


class UsuarioCreate(UsuarioBase):
    pass


class UsuarioRead(UsuarioBase):
    model_config = {"from_attributes": True}
    id: int

    @field_validator("tecnologias", mode="before")
    @classmethod
    def transformar_string_a_lista(cls, v):
        if isinstance(v, str):
            return v.split(",") if v else []
        return v
