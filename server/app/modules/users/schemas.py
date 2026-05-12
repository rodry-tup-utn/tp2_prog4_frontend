from sqlmodel import SQLModel, Field
from enum import Enum


class Role(str, Enum):
    ADMIN = "ADMIN"
    CONSULTA = "CONSULTA"


class UserPublic(SQLModel):
    id: int
    username: str
    role: str


class UserCreate(SQLModel):
    username: str = Field(max_length=40, min_length=4)
    password: str = Field(min_length=6, max_length=30)
    role: Role = Role.CONSULTA


class UserList(SQLModel):
    data: list[UserPublic]
    total: int


class UserAuthCredentials(SQLModel):
    id: int
    username: str
    role: Role
    hash_pass: str
