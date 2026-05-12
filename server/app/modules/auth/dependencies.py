from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status, Depends
import jwt
from sqlmodel import Session
from app.core.database import get_session
from app.modules.users.services import UserService
from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

forbidden_exception = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="No tienes permisos para ejecutar esta operacion",
    headers={"WWW-Authenticate": "Bearer"},
)
unauthorized_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="No se pudieron validar las credenciales",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_user_service(session: Session = Depends(get_session)) -> UserService:
    return UserService(session)


def get_token_payload(
    token: str = Depends(oauth2_scheme),
):

    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.algorithm]
        )
        return payload

    except jwt.PyJWTError:
        raise unauthorized_exception
