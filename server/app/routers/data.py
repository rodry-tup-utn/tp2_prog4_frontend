from fastapi import APIRouter
from schemas import (
    PaisEnum,
    ModalidadEnum,
    TecnologiaEnum,
    NivelExpEnum,
)  # Ajustá la importación

router = APIRouter(prefix="/data", tags=["Datos de Formulario"])


@router.get("/opciones")
def obtener_opciones_formulario():
    return {
        "paises": [e.value for e in PaisEnum],
        "modalidades": [e.value for e in ModalidadEnum],
        "tecnologias": [e.value for e in TecnologiaEnum],
        "niveles": [e.value for e in NivelExpEnum],
    }
