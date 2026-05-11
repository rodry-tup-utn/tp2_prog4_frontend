from sqlmodel import Session, select, col
from sqlalchemy import func
from models import Usuario
from typing import Sequence


class UsuarioRepository:
    session: Session

    def __init__(self, session: Session) -> None:
        self.session = session

    def _apply_filters(
        self,
        statement,
        busqueda: str = "",
        modalidad: str = "",
        nivel: str = "",
        tecnologia: str = "",
    ):
        if busqueda:
            statement = statement.where(col(Usuario.nombre).ilike(f"%{busqueda}%"))
        if modalidad:
            statement = statement.where(Usuario.modalidad == modalidad)
        if nivel:
            statement = statement.where(Usuario.nivel == nivel)
        if tecnologia:
            statement = statement.where(
                col(Usuario.tecnologias).ilike(f"%{tecnologia}%")
            )
        return statement

    def count(
        self,
        busqueda: str = "",
        modalidad: str = "",
        nivel: str = "",
        tecnologia: str = "",
    ) -> int:
        statement = select(func.count()).select_from(Usuario)
        statement = self._apply_filters(
            statement, busqueda, modalidad, nivel, tecnologia
        )
        return self.session.exec(statement).one()

    def get_by_id(self, id: int) -> Usuario | None:
        statement = select(Usuario).where(Usuario.id == id)
        return self.session.exec(statement).first()

    def get_all(
        self,
        offset: int = 0,
        limit: int = 8,
        busqueda: str = "",
        modalidad: str = "",
        nivel: str = "",
        tecnologia: str = "",
    ) -> Sequence[Usuario]:
        statement = select(Usuario).order_by(Usuario.nombre)
        statement = self._apply_filters(
            statement, busqueda, modalidad, nivel, tecnologia
        )
        statement = statement.offset(offset).limit(limit)
        return self.session.exec(statement).all()
