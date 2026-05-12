from sqlmodel import SQLModel, Field
from app.modules.users.schemas import Role


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(min_length=4, max_length=40, unique=True)
    hash_pass: str = Field()
    role: Role = Role.CONSULTA
