import pandas as pd
from regex import match

#dff = pd.read_csv("D:/Datathon/backend/Data/data.csv",
#                 encoding='utf-8', delimiter=';')
# Beispiel eines Test-Dictionaries


def filter(df : pd.DataFrame, data : dict)-> pd.DataFrame:

    conditions = []

    # Durchlaufen des Dictionaries
    for key, value in data.items():
        if value != "-1":
            conditions.append(f"{key} == '{value}'")
    # Bedingungen zusammenfügen
    query_string = " & ".join(conditions)
    # Pandas Query korrekt ausführen
    print(query_string)
    filter_def = df
    if(query_string != ""):
        filter_def = df.query(query_string, local_dict={"value_dict": data})

    return filter_def

#print(filter(dff, test_dict))
