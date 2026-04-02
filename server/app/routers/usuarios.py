from fastapi import APIRouter, Depends, HTTPException
import services
from database import get_session
from sqlmodel import Session
from schemas import UsuarioRead, UsuarioCreate

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.get("/", response_model=list[UsuarioRead])
def get_all(session: Session = Depends(get_session)):
    return services.get_all(session)


@router.post("/", response_model=UsuarioRead)
def registrar_usuario(data: UsuarioCreate, sesion: Session = Depends(get_session)):
    return services.registrar_usuario(sesion, data)


@router.get("/{usuario_id}", response_model=UsuarioRead)
def get_by_id(usuario_id: int, session: Session = Depends(get_session)):
    try:
        usuario = services.get_by_id(session, usuario_id)
        return usuario
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
