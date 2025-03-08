from pydantic import BaseModel
from typing import Optional

# Modell für Diagrammauswahl
class AuswahlDiagramm(BaseModel):
    diagrammart: str
    yAchse: str
    vglMit: str
    sortierart: str  # "aufsteigend" oder "absteigend"
    sortierenBy: str
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

