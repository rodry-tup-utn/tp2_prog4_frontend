from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import create_db_and_tables
from routers.data import router as data_router
from routers.usuarios import router as usuarios_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="Backend Trabajo Practico 2",
    lifespan=lifespan,
    description="API Basica para TP React",
)

app.include_router(data_router)
app.include_router(usuarios_router)
