from pydantic import BaseModel
from typing import Optional,Any

# Modell für Diagrammauswahl
class AuswahlDiagramm(BaseModel):
    class AuswahlDiagramm(BaseModel):
        diagrammart: str
        yAchse: str
        vglMit: str
        sortierart: str
        sortierenBy: str
        Region: Optional[Any] = None
        Bundeslaender: Optional[Any] = None
        Geschlecht: Optional[Any] = None
        Versicherungsart: Optional[Any] = None
        Abrechnungsziffer: Optional[Any] = None
        Woche: Optional[Any] = None
        Altersgruppe: Optional[Any] = None
        Fachrichtung: Optional[Any] = None
        Absolute_Anzahl: Optional[Any] = None
        Extrapolierte_Impfungen: Optional[Any] = None
        Risikogruppen: Optional[Any] = None
