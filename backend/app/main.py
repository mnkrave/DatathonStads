from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .models import AuswahlDiagramm  # Relativer Import bleibt
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import matplotlib.pyplot as plt
import connector as c
app = FastAPI()

# 🚀 CORS aktivieren
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Erlaubt ALLE Domains (für Entwicklung)
    allow_credentials=True,
    allow_methods=["*"],  # Erlaubt ALLE HTTP-Methoden (GET, POST, etc.)
    allow_headers=["*"],  # Erlaubt ALLE Header
)
def generate_diagram():
    plt.figure(figsize=(5, 3))
    plt.plot([1, 2, 3, 4], [10, 20, 25, 30], marker='o')
    plt.xlabel("X-Achse")
    plt.ylabel("Y-Achse")
    plt.title("Beispiel-Diagramm")
    plt.savefig("diagram.png")  # Speichert das Bild
    plt.close()

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
    file_path = c.connect(request.dict())  # Diagramm generieren
    return FileResponse(file_path, media_type="image/png")
