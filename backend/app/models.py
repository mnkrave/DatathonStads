from pydantic import BaseModel
from typing import Optional,Any

# Modell für Diagrammauswahl
class AuswahlDiagramm(BaseModel):
        diagrammart: str
        yAchse: str
        vglMit: str
        sortierart: str
        sortierenBy:str
        Region:str
        Bundeslaender:str
        Geschlecht: str
        Versicherungsart: str
        Abrechnungsziffer:  str
        Altersgruppe: str
        Fachrichtung: str
        Absolute_Anzahl:  str
        Extrapolierte_Impfungen: str
        Risikogruppen:  str
