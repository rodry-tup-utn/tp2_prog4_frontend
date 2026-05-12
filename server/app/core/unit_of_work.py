from sqlmodel import Session
from app.modules.participant.repository import ParticipantRepository
from app.modules.users.repository import UserRepository


class UnitOfWork:

    def __init__(self, session: Session) -> None:
        self._session = session
        self.participants = ParticipantRepository(session)
        self.users = UserRepository(session)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        if exc_type is None:
            self._session.commit()
        else:
            self._session.rollback()

    def commit(self) -> None:
        self._session.commit()

    def rollback(self) -> None:
        self._session.rollback()
