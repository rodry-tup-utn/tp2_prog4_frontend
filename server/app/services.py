from sqlmodel import Session
from models import Usuario
from schemas import UsuarioCreate, UsuarioUpdate, UsuarioRead, UsuarioList
from fastapi import status, HTTPException
from unit_of_work import UnitOfWork


class UsuarioService:
    _session: Session

    def __init__(self, session: Session) -> None:
        self._session = session

    def get_all(
        self,
        offset: int = 0,
        limit: int = 8,
        busqueda: str = "",
        modalidad: str = "",
        nivel: str = "",
        tecnologia: str = "",
    ) -> UsuarioList:
        with UnitOfWork(self._session) as uow:
            usuarios = uow.usuarios.get_all(
                offset, limit, busqueda, modalidad, nivel, tecnologia
            )
            total = uow.usuarios.count(busqueda, modalidad, nivel, tecnologia)

            data = [UsuarioRead.model_validate(usuario) for usuario in usuarios]

            return UsuarioList(data=data, total=total)

    def add(self, data: UsuarioCreate) -> Usuario:
        user_data = data.model_dump(mode="json")

        if "tecnologias" in user_data:
            user_data["tecnologias"] = ",".join(user_data["tecnologias"])

        nuevo_usuario = Usuario.model_validate(user_data)

        with UnitOfWork(self._session) as uow:
            uow.usuarios.add(nuevo_usuario)

        self._session.refresh(nuevo_usuario)
        return nuevo_usuario

    def _get_or_404(self, uow: UnitOfWork, id: int):
        usuario = uow.usuarios.get_by_id(id)
        if not usuario:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND, f"Usuario id {id} no encontrado "
            )
        return usuario

    def get_by_id(self, id: int) -> UsuarioRead:
        with UnitOfWork(self._session) as uow:
            usuario = self._get_or_404(uow, id)
            result = UsuarioRead.model_validate(usuario)

        return result

    def eliminar(self, id: int):
        with UnitOfWork(self._session) as uow:
            usuario = self._get_or_404(uow, id)
            uow.usuarios.delete(usuario)
        return

    def update(self, id: int, data: UsuarioUpdate) -> UsuarioRead:
        with UnitOfWork(self._session) as uow:
            usuario = self._get_or_404(uow, id)
            update_data = data.model_dump(mode="json", exclude_unset=True)
            if "tecnologias" in update_data and data.tecnologias is not None:
                update_data["tecnologias"] = ",".join(
                    [t.value for t in data.tecnologias]
                )
            for key, value in update_data.items():
                setattr(usuario, key, value)
            result = UsuarioRead.model_validate(usuario)
        return result
