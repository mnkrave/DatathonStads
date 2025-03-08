from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import base64

app = FastAPI()

# ----------------- Deine Modell-Klassen -----------------
class AuswahlDiagramm(BaseModel):
  diagrammart: str
  yAchse: str
  vglMit: str
  sortierart: str

class FilterRequest(BaseModel):
  Region: Optional[str]
  Bundeslaender: Optional[str]
  Geschlecht: Optional[str]
  Versicherungsart: Optional[str]
  Abrechnungsziffer: Optional[str]
  Woche: Optional[str]
  KV_Region: Optional[str]
  Altersgruppe: Optional[str]
  Fachrichtung: Optional[str]
  Absolute_Anzahl: Optional[str]
  Extrapolierte_Impfungen: Optional[str]
  Risikogruppen: Optional[str]

class SaveSelectionsRequest(BaseModel):
  leftFilters: FilterRequest
  rightSelection: AuswahlDiagramm
  selectedState: Optional[dict]  # Im "Deutschland Map"-Modus evtl. -1 oder None

# Hier speichern wir die zuletzt empfangenen Daten (POST /diagram)
saved_data = {}

@app.post("/diagram")
def save_selections(request: SaveSelectionsRequest):
  """
  POST /diagram speichert die vom Frontend gesendeten Einstellungen
  (FilterRequest + AuswahlDiagramm + selectedState) in saved_data.
  """
  global saved_data
  saved_data = request.dict()
  return {"message": "Daten erfolgreich gespeichert", "data": saved_data}

@app.get("/diagram")
def get_selections():
  """
  GET /diagram liefert die aktuell gespeicherten Daten zurück.
  Zusätzlich wird hier die Datei 'Jacobi Matrix.png' eingelesen,
  als Base64-String kodiert und ebenfalls zurückgegeben.
  """
  if not saved_data:
    return {"message": "Noch keine Daten gespeichert."}

  # Kopie der gespeicherten Daten anlegen, damit wir sie erweitern können
  response_data = saved_data.copy()

  # Versuche die Bilddatei zu lesen und in Base64 zu konvertieren
  try:
    with open("Jacobi Matrix.png", "rb") as img_file:
      encoded_bytes = base64.b64encode(img_file.read())
      bit_string = encoded_bytes.decode("utf-8")  # In UTF-8-String umwandeln
    # Hänge den Bit String an die Antwort an
    response_data["imageBits"] = bit_string
  except FileNotFoundError:
    # Falls die Datei nicht gefunden wird, geben wir einen Hinweis zurück
    response_data["imageBits"] = "Bilddatei nicht gefunden."

  return response_data

@app.get("/")
def read_root():
  return {"message": "Hello, FastAPI is running!"}
