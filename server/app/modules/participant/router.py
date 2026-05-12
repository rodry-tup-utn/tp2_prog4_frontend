from fastapi import APIRouter, Depends, status
from app.core.database import get_session
from sqlmodel import Session
from app.modules.participant.schemas import (
    ParticipantRead,
    ParticipantCreate,
    ParticipantUpdate,
    ParticipantList,
)
from app.modules.participant.services import ParticipantService
from app.modules.auth.dependencies import get_token_payload, forbidden_exception

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def get_participant_service(
    session: Session = Depends(get_session),
) -> ParticipantService:
    return ParticipantService(session)


@router.get("/", response_model=ParticipantList)
def get_all(
    offset: int = 0,
    limit: int = 8,
    busqueda: str = "",
    modalidad: str = "",
    nivel: str = "",
    tecnologia: str = "",
    svc: ParticipantService = Depends(get_participant_service),
    _token: dict = Depends(get_token_payload),
):
    return svc.get_all(offset, limit, busqueda, modalidad, nivel, tecnologia)


@router.post("/", response_model=ParticipantRead)
def registrar_usuario(
    data: ParticipantCreate,
    svc: ParticipantService = Depends(get_participant_service),
    token: dict = Depends(get_token_payload),
):
    if token.get("role") != "ADMIN":
        raise forbidden_exception
    return svc.add(data)


@router.get("/{usuario_id}", response_model=ParticipantRead)
def get_by_id(
    usuario_id: int,
    svc: ParticipantService = Depends(get_participant_service),
    _token: dict = Depends(get_token_payload),
):
    return svc.get_by_id(usuario_id)


@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(
    usuario_id: int,
    svc: ParticipantService = Depends(get_participant_service),
    token: dict = Depends(get_token_payload),
):
    if token.get("role") != "ADMIN":
        raise forbidden_exception
    svc.eliminar(usuario_id)


@router.patch("/{id}")
def update(
    id: int,
    data: ParticipantUpdate,
    svc: ParticipantService = Depends(get_participant_service),
    token: dict = Depends(get_token_payload),
):
    if token.get("role") != "ADMIN":
        raise forbidden_exception
    return svc.update(id, data)
