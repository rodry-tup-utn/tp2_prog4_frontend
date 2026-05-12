from sqlmodel import Session, select, col
from sqlalchemy import func
from app.modules.participant.model import Participant
from typing import Sequence


class ParticipantRepository:
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
            statement = statement.where(col(Participant.nombre).ilike(f"%{busqueda}%"))
        if modalidad:
            statement = statement.where(Participant.modalidad == modalidad)
        if nivel:
            statement = statement.where(Participant.nivel == nivel)
        if tecnologia:
            statement = statement.where(
                col(Participant.tecnologias).ilike(f"%{tecnologia}%")
            )
        return statement

    def count(
        self,
        busqueda: str = "",
        modalidad: str = "",
        nivel: str = "",
        tecnologia: str = "",
    ) -> int:
        statement = select(func.count()).select_from(Participant)
        statement = self._apply_filters(
            statement, busqueda, modalidad, nivel, tecnologia
        )
        return self.session.exec(statement).one()

    def get_by_id(self, id: int) -> Participant | None:
        statement = select(Participant).where(Participant.id == id)
        return self.session.exec(statement).first()

    def get_all(
        self,
        offset: int = 0,
        limit: int = 8,
        busqueda: str = "",
        modalidad: str = "",
        nivel: str = "",
        tecnologia: str = "",
    ) -> Sequence[Participant]:
        statement = select(Participant).order_by(Participant.nombre)
        statement = self._apply_filters(
            statement, busqueda, modalidad, nivel, tecnologia
        )
        statement = statement.offset(offset).limit(limit)
        return self.session.exec(statement).all()

    def add(self, data) -> Participant:
        self.session.add(data)
        self.session.flush()
        self.session.refresh(data)
        return data

    def delete(self, usuario: Participant):
        self.session.delete(usuario)
        self.session.flush()
