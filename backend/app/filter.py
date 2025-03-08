import pandas as pd


#dff = pd.read_csv("D:/Datathon/backend/Data/data.csv",
#                 encoding='utf-8', delimiter=';')
# Beispiel eines Test-Dictionaries


def filter(df : pd.DataFrame, data : dict)-> pd.DataFrame:

    conditions = []
    print(data.get("sortierenBy"))
    # Durchlaufen des Dictionaries
    keys_to_remove = {"sortierenBy", "sortierart"}
    # Neues Dictionary ohne die unerwünschten Schlüssel
    data_cut = {key: value for key, value in data.items() if key not in keys_to_remove}
    for key, value in data_cut.items():
        if value != "-1":
            conditions.append(f"{key} == '{value}'")
    # Bedingungen zusammenfügen
    query_string = " & ".join(conditions)
    # Pandas Query korrekt ausführen
    print(query_string)
    filter_def = df
    if(query_string != ""):
        filter_def = df.query(query_string, local_dict={"value_dict": data_cut})

    return filter_def

#print(filter(dff, test_dict))
def sortieren(df : pd.DataFrame, data : dict)-> pd.DataFrame:
    if (data.get("sortierart") == "Aufsteigend"):
        filter_def = df.sort_values(by=[data.get("sortierenBy")], ascending=True)
    elif(data.get("sortierart") == "-1"):
        filter_def = df
    else:
        filter_def = df.sort_values(by=[data.get("sortierenBy")], ascending=False)
    return filter_def
