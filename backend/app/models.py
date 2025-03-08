from pydantic import BaseModel
from typing import Optional

# Modell für Diagrammauswahl
class AuswahlDiagramm(BaseModel):
    diagrammart: str
    yAchse: str
    vglMit: str
    sortierart: str  # "aufsteigend" oder "absteigend"

from pydantic import BaseModel
from typing import Optional

# Modell für Filter-Abfragen basierend auf den Optionen im Bild
class FilterRequest(BaseModel):
    Region: Optional[str]
    Bundeslaender: Optional[str]
    Geschlecht: Optional[str]
    Versicherungsart: Optional[str]
    Abrechnungsziffer: Optional[str]
    Woche: Optional[str]
    Altersgruppe: Optional[str]
    Fachrichtung: Optional[str]
    Absolute_Anzahl: Optional[str]
    Extrapolierte_Impfungen: Optional[str]
    Risikogruppen: Optional[str]

class DiagramResponse(BaseModel):
    # Base64-kodiertes Bild
    image_base64: str

    # Optional: zusätzliche Felder, falls ihr Metadaten zurückgeben möchtet
    # z.B. info: str = "Hier könnte eine Info stehen"
