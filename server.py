from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random, string, json
import github_handler

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def generar_codigo(longitud=20):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=longitud))

@app.post("/generar_licencia")
def generar_licencia():
    codigo = generar_codigo()
    fecha_vencimiento = (datetime.utcnow() + timedelta(days=30)).strftime("%Y-%m-%d")
    github_handler.actualizar_json(codigo, fecha_vencimiento)
    return {"codigo": codigo}