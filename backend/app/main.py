from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .models import AuswahlDiagramm  # Relativer Import bleibt

app = FastAPI()

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
