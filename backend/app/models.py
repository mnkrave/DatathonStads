from pydantic import BaseModel
from typing import Optional

# Modell für Diagrammauswahl
class AuswahlDiagramm(BaseModel):
    diagrammart: str
    yAchse: str
    vglMit: str
    sortierart: str
    sortierenBy: str
    Region: Optional[str] = None
    Bundeslaender: Optional[str] = None
    Geschlecht: Optional[str] = None
    Versicherungsart: Optional[str] = None
    Abrechnungsziffer: Optional[str] = None
    Woche: Optional[str] = None
    Altersgruppe: Optional[str] = None
    Fachrichtung: Optional[str] = None
    Absolute_Anzahl: Optional[str] = None
    Extrapolierte_Impfungen: Optional[str] = None
    Risikogruppen: Optional[str] = None

