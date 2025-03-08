import pandas as pd
import matplotlib.pyplot as plt
import app.createPlot as cp
from pathlib import Path
test_dict = {
    "diagrammart": "vergleichsgraph",
    "yAchse" : "Absolute Werte",
    "vglMit": "Bundeslaender",
    "sortierart": "Aufsteigendd",
    "sortierenBy": "Extrapolierte_Impfungen",
    "Region": "-1",
    "Bundeslaender": "-1",
    "Geschlecht": "Mann",
    "Versicherungsart": "-1",
    "Abrechnungsziffer": "-1",
    "Woche": "-1",  # Beispiel: Kalenderwoche 12
    "KV_Region": "-1",
    "Altersgruppe": "30-59",
    "Fachrichtung": "-1",
    "Absolute_Anzahl": "-1",
    "Extrapolierte_Impfungen": "-1",  # Falls nicht ausgewählt
    "Risikogruppen": "-1"
}

dff = pd.read_csv("Data/data.csv",encoding='utf-8', delimiter=';')
def connect(dc : dict) -> str:
    filename = "diagram.png"
    plt = cp.create_plot_from_dict(cleanUp(dc), dff)
    save_path = Path("static")
    save_path.mkdir(parents=True, exist_ok=True)  # Stellt sicher, dass "static/" existiert

    file_path = save_path / filename  # Datei im "static/" Ordner speichern
    plt.savefig(file_path, format="png", dpi=300)
    plt.close()  # Speichern & Ressourcen freigeben
    return file_path




def cleanUp(dc : dict) -> dict:
    column_mapping = {
    "Bundeslaender": "kvregion",
    "Region": "region",
    "Abrechnungsziffer": "insurancecode",
    "Geschlecht": "gender",
    "Versicherungsart": "insurancetype",
    "Woche": "week",
    "Altersgruppe": "age_group",
    "Fachrichtung": "specialization",
    "Absolute_Anzahl": "absolute",
    "Extrapolierte_Impfungen": "extrapolated",
    "Risikogruppen": "risk_groups",
    }
    converted_dict = {}
    for key, value in dc.items():
        if key in column_mapping:
            converted_dict[column_mapping[key]] = value

    converted_dict["vglMit"] = column_mapping[dc["vglMit"]]
    converted_dict["yAchse"] = dc["yAchse"]
    converted_dict["diagrammart"] = dc["diagrammart"]
    converted_dict["sortierart"] = dc["sortierart"]
    converted_dict["sortierenBy"] = column_mapping[dc["sortierenBy"]]
    if converted_dict["gender"] == "Mann":
        converted_dict["gender"] = "m"
    elif converted_dict["gender"] == "Frau":
        converted_dict["gender"] = "f"
    elif converted_dict["gender"] == "-1":
        converted_dict["gender"] = "-1"
    else:
        converted_dict["gender"] = "d"
    return converted_dict

connect(test_dict)