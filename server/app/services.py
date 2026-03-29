from sqlmodel import Session, select
from models import Usuario
from schemas import UsuarioCreate
from typing import Sequence


def registrar_usuario(session: Session, data: UsuarioCreate) -> Usuario:
    user_data = data.model_dump()

    if "tecnologias" in user_data:
        user_data["tecnologias"] = ",".join([t.value for t in data.tecnologias])

    nuevo_usuario = Usuario.model_validate(user_data)

    session.add(nuevo_usuario)
    session.commit()
    session.refresh(nuevo_usuario)

    return nuevo_usuario


def get_all(session: Session) -> Sequence[Usuario]:
    statement = select(Usuario)

    result = session.exec(statement)

    usuarios_db = result.all()

    return usuarios_db


def get_by_id(session: Session, usuario_id: int) -> Usuario:
    usuario = session.get(Usuario, usuario_id)

    if not usuario:
        raise ValueError("Usuario no encontrado")

    return usuario
