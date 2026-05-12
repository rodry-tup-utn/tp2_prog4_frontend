from fastapi import APIRouter, Depends, status
from app.core.database import get_session
from sqlmodel import Session
from app.modules.auth.schemas import LoginRequest, Token
from app.modules.auth.service import AuthService
from app.modules.users.schemas import UserCreate, UserPublic
from app.modules.users.services import UserService
from app.modules.auth.dependencies import get_token_payload

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=Token)
def login(data: LoginRequest, session: Session = Depends(get_session)):
    svc = AuthService(session)
    return svc.login_user(data.username, data.password)


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(
    data: UserCreate,
    session: Session = Depends(get_session),
    token: dict = Depends(get_token_payload),
):
    if token.get("role") != "ADMIN":
        from app.modules.auth.dependencies import forbidden_exception
        raise forbidden_exception
    svc = UserService(session)
    return svc.add(data)


@router.get("/me")
def me(token: dict = Depends(get_token_payload)):
    return {"username": token.get("sub"), "role": token.get("role")}
