from sqlmodel import Session, select
from models import Usuario
from schemas import UsuarioCreate, UsuarioUpdate, UsuarioRead
from typing import Sequence
from fastapi import status, HTTPException


def registrar_usuario(session: Session, data: UsuarioCreate) -> Usuario:
    user_data = data.model_dump()

    if "tecnologias" in user_data:
        user_data["tecnologias"] = ",".join([t.value for t in data.tecnologias])

    nuevo_usuario = Usuario.model_validate(user_data)

    session.add(nuevo_usuario)
    session.commit()
    session.refresh(nuevo_usuario)

    return nuevo_usuario


def get_all(session: Session) -> Sequence[UsuarioRead]:
    statement = select(Usuario)

    result = session.exec(statement)

    usuarios_db = result.all()

    result = [UsuarioRead.model_validate(u) for u in usuarios_db]

    return result


def get_by_id_or_404(session: Session, usuario_id) -> Usuario:
    usuario = session.get(Usuario, usuario_id)

    if not usuario:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, f"Usuario id {usuario_id} no encontrado"
        )
    return usuario


def get_by_id(session: Session, usuario_id: int) -> UsuarioRead:
    usuario = get_by_id_or_404(session, usuario_id)

    return UsuarioRead.model_validate(usuario)


def eliminar_usuario(session: Session, usuario_id: int) -> UsuarioRead:
    usuario = get_by_id(session, usuario_id)

    session.delete(usuario)
    session.commit()
    result = UsuarioRead.model_validate(usuario)

    return result


def actualizar_usuario(
    session: Session, usuario_id: int, data: UsuarioUpdate
) -> UsuarioRead:
    usuario = get_by_id_or_404(session, usuario_id)

    update_data = data.model_dump(exclude_unset=True)
    if "tecnologias" in update_data and data.tecnologias:
        update_data["tecnologias"] = ",".join([t.value for t in data.tecnologias])

    for key, value in update_data.items():
        setattr(usuario, key, value)

    session.add(usuario)
    session.commit()
    session.refresh(usuario)

    result = UsuarioRead.model_validate(usuario)

    return result
