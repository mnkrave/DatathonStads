import pandas as pd
from regex import match

#dff = pd.read_csv("D:/Datathon/backend/Data/data.csv",
#                 encoding='utf-8', delimiter=';')
# Beispiel eines Test-Dictionaries

test_dict = {
    "Region": "Region Süd",
    "Bundeslaender": "Baden-Württemberg",
    "Geschlecht": "f",
    "Versicherungsart": "GKV",
    "Abrechnungsziffer": "89111",
    "Woche": "2024-31",  # Beispiel: Kalenderwoche 12
    "KV_Region": "-1",
    "Altersgruppe": "60-199",
    "Fachrichtung": "-1",
    "Absolute_Anzahl": "-1",
    "Extrapolierte_Impfungen": "-1",  # Falls nicht ausgewählt
    "Risikogruppen": "-1"
}



def filter(df : pd.DataFrame, data : dict)-> pd.DataFrame:

    conditions = []

    # Durchlaufen des Dictionaries
    for key, value in df.items():
        if value != "-1":
            conditions.append(f" {key} == '{df[key]}'")

    # Bedingungen zusammenfügen
    query_string = " & ".join(conditions)
    # Pandas Query korrekt ausführen
    print(query_string)
    filter_def = df.query(query_string, local_dict={"value_dict": df})
    return filter_def

#print(filter(dff, test_dict))
