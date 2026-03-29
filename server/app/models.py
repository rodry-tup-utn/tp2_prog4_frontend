from sqlmodel import SQLModel, Field


class Usuario(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str
    nombre: str
    edad: int = Field(ge=12, description="No puedes ser menor de 12 años")
    pais: str
    modalidad: str
    tecnologias: str
    nivel: str
    acepta_terminos: bool
