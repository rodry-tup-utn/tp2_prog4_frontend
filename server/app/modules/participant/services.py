from sqlmodel import Session
from app.modules.participant.model import Participant
from app.modules.participant.schemas import (
    ParticipantCreate,
    ParticipantUpdate,
    ParticipantRead,
    ParticipantList,
)
from fastapi import status, HTTPException
from app.core.unit_of_work import UnitOfWork


class ParticipantService:
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
    ) -> ParticipantList:
        with UnitOfWork(self._session) as uow:
            usuarios = uow.participants.get_all(
                offset, limit, busqueda, modalidad, nivel, tecnologia
            )
            total = uow.participants.count(busqueda, modalidad, nivel, tecnologia)

            data = [
                ParticipantRead.model_validate(participant) for participant in usuarios
            ]

            return ParticipantList(data=data, total=total)

    def add(self, data: ParticipantCreate) -> Participant:
        participant_data = data.model_dump(mode="json")

        if "tecnologias" in participant_data:
            participant_data["tecnologias"] = ",".join(participant_data["tecnologias"])

        nuevo_usuario = Participant.model_validate(participant_data)

        with UnitOfWork(self._session) as uow:
            uow.participants.add(nuevo_usuario)

        self._session.refresh(nuevo_usuario)
        return nuevo_usuario

    def _get_or_404(self, uow: UnitOfWork, id: int):
        participant = uow.participants.get_by_id(id)
        if not participant:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND, f"Participante id {id} no encontrado "
            )
        return participant

    def get_by_id(self, id: int) -> ParticipantRead:
        with UnitOfWork(self._session) as uow:
            participant = self._get_or_404(uow, id)
            result = ParticipantRead.model_validate(participant)

        return result

    def eliminar(self, id: int):
        with UnitOfWork(self._session) as uow:
            participant = self._get_or_404(uow, id)
            uow.participants.delete(participant)
        return

    def update(self, id: int, data: ParticipantUpdate) -> ParticipantRead:
        with UnitOfWork(self._session) as uow:
            participant = self._get_or_404(uow, id)
            update_data = data.model_dump(mode="json", exclude_unset=True)
            if "tecnologias" in update_data and data.tecnologias is not None:
                update_data["tecnologias"] = ",".join(
                    [t.value for t in data.tecnologias]
                )
            for key, value in update_data.items():
                setattr(participant, key, value)
            result = ParticipantRead.model_validate(participant)
        return result
