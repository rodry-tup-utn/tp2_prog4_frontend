from fastapi import HTTPException, status
from app.modules.users.services import UserService
from sqlmodel import Session
from app.core.security import get_password_hash, verify_password, create_access_token
from app.modules.auth.schemas import Token

DUMMY_HASH = get_password_hash("dummypassword")


class AuthService:
    def __init__(self, session: Session) -> None:
        self._user_service = UserService(session)

    def _authenticate_token(self, username: str, password: str):
        user = self._user_service.get_user_credentials(username)
        if not user:
            verify_password(password, DUMMY_HASH)
            return False
        if not verify_password(password, user.hash_pass):
            return False

        return user

    def login_user(self, username: str, password: str) -> Token:
        user = self._authenticate_token(username, password)
        if not user:
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "Usuario o contraseña incorrectos",
                headers={"WWW-Authenticate": "Bearer"},
            )
        payload = {"sub": user.username, "role": user.role}
        access_token = create_access_token(payload)

        return Token(access_token=access_token, token_type="bearer")
