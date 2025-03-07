from pydantic import BaseModel
from typing import Optional

# Modell für Diagrammauswahl
class AuswahlDiagramm(BaseModel):
    diagrammart: str
    yAchse: str
    vglMit: str
    sortierart: str  # "aufsteigend" oder "absteigend"

# Modell für Filter-Abfragen
class FilterRequest(BaseModel):
    diagrammart: str
    yAchse: str
    vglMit: str
    sortierart: str  # "aufsteigend" oder "absteigend"
    Region: str
    Bundeslaender: str
    Geschlecht: str
    Versicherungsart: str
    Abrechnungsziffer: str
