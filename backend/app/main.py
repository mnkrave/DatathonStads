from fastapi import FastAPI
from models import AuswahlDiagramm
from fastapi import FastAPI, HTTPException
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

@app.get("/diagram")
async def create_diagram(request: AuswahlDiagramm):
    # Prüfen, ob alle notwendigen Felder vorhanden sind
    if not request.diagrammart or not request.yAchse:
        raise HTTPException(status_code=400, detail="diagrammart und yAchse sind Pflichtfelder!")

    # Simulierte Verarbeitung der Daten (hier könnt ihr z.B. das Diagramm generieren)
    print(f"Empfangene Daten: {request.dict()}")

    return {"message": "Daten erhalten", "diagrammart": request.diagrammart, "yAchse": request.yAchse}