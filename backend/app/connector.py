





def cleanUp(dc : dict) -> dict:
    column_mapping = {
    "Region": "kvregion",
    "Bundeslaender": "region",
    "Abrechnungsziffer": "insurancecode",
    "Geschlecht": "gender",
    "Versicherungsart": "insurancetype",
    "Woche": "week",
    "KV_Region": "kvregion",
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
    if converted_dict["gender"] == "Mann":
        converted_dict["gender"] = "m"
    elif converted_dict["gender"] == "Frau":
        converted_dict["gender"] = "f"
    else:
        converted_dict["gender"] = "d"
