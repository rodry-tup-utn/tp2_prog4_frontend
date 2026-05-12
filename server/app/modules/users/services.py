from sqlmodel import Session
from app.core.unit_of_work import UnitOfWork
from fastapi import HTTPException, status
from app.modules.users.schemas import (
    UserList,
    Role,
    UserCreate,
    UserPublic,
    UserAuthCredentials,
)
from app.core.security import get_password_hash
from app.modules.users.model import User


class UserService:
    _session: Session

    def __init__(self, session: Session) -> None:
        self._session = session

    def _get_or_404(self, uow: UnitOfWork, id: int):
        user = uow.users.get_by_id(id)

        if not user:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND, f"Usuario id {id} no encontrado"
            )
        return user

    def _get_by_username_or_404(self, uow: UnitOfWork, username: str):
        user = uow.users.get_by_username(username)
        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Usuario no encontrado")

        return user

    def _assert_username_unique(self, uow: UnitOfWork, username: str):
        user = uow.users.get_by_username(username)
        if user:
            raise HTTPException(status.HTTP_409_CONFLICT, "Nombre de usuario existente")

    def get_all(self, offset: int = 0, limit: int = 20) -> UserList:
        with UnitOfWork(self._session) as uow:
            users = uow.users.get_all(offset, limit)
            total = uow.users.count()

            data = [UserPublic.model_validate(user) for user in users]

            result = UserList(data=data, total=total)

        return result

    def get_by_id(self, id: int) -> UserPublic:
        with UnitOfWork(self._session) as uow:
            user = self._get_or_404(uow, id)
            return UserPublic.model_validate(user)

    def get_by_username(self, username: str):
        with UnitOfWork(self._session) as uow:
            user = self._get_by_username_or_404(uow, username)
            return UserPublic.model_validate(user)

    def update_rol(self, role: Role, id: int):
        with UnitOfWork(self._session) as uow:
            user = self._get_or_404(uow, id)

            user.role = role
            uow.users.add(user)

            result = UserPublic.model_validate(user)

        return result

    def add(self, data: UserCreate) -> UserPublic:
        with UnitOfWork(self._session) as uow:
            self._assert_username_unique(uow, data.username)
            user_data = data.model_dump(exclude={"password"})
            user_data["hash_pass"] = get_password_hash(data.password)

            user = User(**user_data)

            uow.users.add(user)

            result = UserPublic.model_validate(user)

        return result

    def get_user_credentials(self, username: str) -> UserAuthCredentials:
        with UnitOfWork(self._session) as uow:
            user = self._get_by_username_or_404(uow, username)

            result = UserAuthCredentials.model_validate(user)

        return result
