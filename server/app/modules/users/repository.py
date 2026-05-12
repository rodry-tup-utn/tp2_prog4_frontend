from sqlmodel import Session, select, col
from app.modules.users.model import User
from typing import Sequence
from sqlalchemy import func


class UserRepository:
    session: Session

    def __init__(self, session: Session) -> None:
        self.session = session

    def get_all(self, offset: int = 0, limit: int = 0) -> Sequence[User]:
        statement = select(User).order_by(User.username).offset(offset).limit(limit)

        return self.session.exec(statement).all()

    def get_by_id(self, id: int) -> User | None:
        statement = select(User).where(User.id == id)

        return self.session.exec(statement).first()

    def get_by_username(self, username: str) -> User | None:
        statement = select(User).where(User.username == username)

        return self.session.exec(statement).first()

    def delete(self, user: User):
        self.session.delete(user)
        self.session.flush()

    def add(self, data) -> User:
        self.session.add(data)
        self.session.flush()
        self.session.refresh(data)
        return data

    def count(self) -> int:
        statement = select(func.count()).select_from(User)

        return self.session.exec(statement).one()
