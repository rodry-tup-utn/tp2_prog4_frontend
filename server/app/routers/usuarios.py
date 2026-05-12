from fastapi import APIRouter, Depends, status
import services
from database import get_session
from sqlmodel import Session
from schemas import UsuarioRead, UsuarioCreate, UsuarioUpdate, UsuarioList
from services import UsuarioService


def get_user_service(session: Session = Depends(get_session)) -> UsuarioService:
    return UsuarioService(session)


router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.get("/", response_model=UsuarioList)
def get_all(
    offset: int = 0,
    limit: int = 8,
    busqueda: str = "",
    modalidad: str = "",
    nivel: str = "",
    tecnologia: str = "",
    svc: UsuarioService = Depends(get_user_service),
):
    return svc.get_all(offset, limit, busqueda, modalidad, nivel, tecnologia)


@router.post("/", response_model=UsuarioRead)
def registrar_usuario(
    data: UsuarioCreate,
    svc: UsuarioService = Depends(get_user_service),
):
    return svc.add(data)


@router.get("/{usuario_id}", response_model=UsuarioRead)
def get_by_id(usuario_id: int, svc: UsuarioService = Depends(get_user_service)):
    return svc.get_by_id(usuario_id)


@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(usuario_id: int, svc: UsuarioService = Depends(get_user_service)):
    svc.eliminar(usuario_id)


@router.patch("/{id}")
def update(
    id: int, data: UsuarioUpdate, svc: UsuarioService = Depends(get_user_service)
):
    return svc.update(id, data)
