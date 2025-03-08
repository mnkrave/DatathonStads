import pandas as pd
import filter as f
bundeslaender_einwohner = {
    "Baden-Württemberg": {"Einwohner insgesamt": 11100394, "Männer": 5468000, "Frauen": 5632000},
    "Bayern": {"Einwohner insgesamt": 13124737, "Männer": 6505000, "Frauen": 6620000},
    "Berlin": {"Einwohner insgesamt": 3664088, "Männer": 1805000, "Frauen": 1859000},
    "Brandenburg": {"Einwohner insgesamt": 2521893, "Männer": 1241000, "Frauen": 1280000},
    "Bremen": {"Einwohner insgesamt": 676463, "Männer": 327000, "Frauen": 349000},
    "Hamburg": {"Einwohner insgesamt": 1847253, "Männer": 901000, "Frauen": 946000},
    "Hessen": {"Einwohner insgesamt": 6293154, "Männer": 3080000, "Frauen": 3210000},
    "Mecklenburg-Vorpommern": {"Einwohner insgesamt": 1608138, "Männer": 780000, "Frauen": 828000},
    "Niedersachsen": {"Einwohner insgesamt": 7982448, "Männer": 3890000, "Frauen": 4090000},
    "Nordrhein-Westfalen": {"Einwohner insgesamt": 17947221, "Männer": 8760000, "Frauen": 9180000},
    "Rheinland-Pfalz": {"Einwohner insgesamt": 4125616, "Männer": 2020000, "Frauen": 2100000},
    "Saarland": {"Einwohner insgesamt": 982348, "Männer": 482000, "Frauen": 500000},
    "Sachsen": {"Einwohner insgesamt": 4056941, "Männer": 1970000, "Frauen": 2080000},
    "Sachsen-Anhalt": {"Einwohner insgesamt": 2180350, "Männer": 1050000, "Frauen": 1130000},
    "Schleswig-Holstein": {"Einwohner insgesamt": 2903773, "Männer": 1420000, "Frauen": 1480000},
    "Thüringen": {"Einwohner insgesamt": 2108203, "Männer": 1030000, "Frauen": 1080000}
}


def deutschland(df : pd.DataFrame, data : dict) -> dict:
    df_filtered = f.filter(df,data)
    daten = bundeslaender_einwohner.get(data.get("kvregion"))
    geimpftVsungepimft = df_filtered.groupby(["kvregion", "extrapolated"]).sum() / daten.get("Einwohner insgesamt")
    anteilManner = df_filtered.groupby(["gender", "extrapolated"]).sum() / daten.get("Männer")
    anteilFrauen = df_filtered.groupby(["gender", "extrapolated"]).sum() / daten.get("Frauen")
    returnData = {
        "name": data.get("kvregion"),
        "Einwohner": daten.get("Einwohner insgesamt"),
        "geimpfRatio": geimpftVsungepimft,
        "anteilManner": anteilManner,
        "anteilFrauen": anteilFrauen,
    }
    return returnData


