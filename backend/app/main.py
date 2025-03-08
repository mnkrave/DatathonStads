from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .models import AuswahlDiagramm  # Relativer Import bleibt
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 🚀 CORS aktivieren
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Erlaubt ALLE Domains (für Entwicklung)
    allow_credentials=True,
    allow_methods=["*"],  # Erlaubt ALLE HTTP-Methoden (GET, POST, etc.)
    allow_headers=["*"],  # Erlaubt ALLE Header
)
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

@app.post("/diagram")  # Ändere GET zu POST
async def create_diagram(request: AuswahlDiagramm):
    # Prüfen, ob die Pflichtfelder vorhanden sind
    if not request.diagrammart or not request.yAchse:
        raise HTTPException(status_code=400, detail="diagrammart und yAchse sind Pflichtfelder!")

    # Simulierte Verarbeitung der Daten
    print(f"Empfangene Daten: {request.dict()}")

    return {"message": "Daten erhalten", "diagrammart": request.diagrammart, "yAchse": request.yAchse}
