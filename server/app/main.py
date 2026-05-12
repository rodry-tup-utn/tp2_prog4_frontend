from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.database import create_db_and_tables, engine
from app.modules.participant.data_router import router as data_router
from app.modules.participant.router import router as usuarios_router
from app.modules.auth.router import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from app.modules.users.schemas import UserCreate
from app.modules.users.services import UserService


def _seed_users():
    with Session(engine) as session:
        svc = UserService(session)
        try:
            svc.add(UserCreate(username="admin", password="admin123", role="ADMIN"))  # type: ignore
            print("  ✓ Usuario admin creado")
        except Exception as e:
            print(f"  - admin: {e}")
        try:
            svc.add(UserCreate(username="consulta", password="consulta123", role="CONSULTA"))  # type: ignore
            print("  ✓ Usuario consulta creado")
        except Exception as e:
            print(f"  - consulta: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    _seed_users()
    yield


app = FastAPI(
    title="Backend Trabajo Practico 2",
    lifespan=lifespan,
    description="API Basica para TP React",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(data_router)
app.include_router(usuarios_router)
app.include_router(auth_router)
