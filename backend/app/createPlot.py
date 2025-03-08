import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import  filter as ft
import itertools
#df = pd.read_csv("C:/Users/maxge/PycharmProjects/DatathonStads/Data/cgm-datathon-challenge-flu_riskgroupsv1.csv", delimiter=';')

data = {
    "diagrammart": "Liniendiagramm",
    "yAchse": "extrapolated",
    "vglMit": "Region",
    "sortierart": "aufsteigend",
    "Region": "Nord",
    "Bundeslaender": None,  # Dieser Schlüssel hat keinen Wert
    "Geschlecht": "M",
    "Versicherungsart": None,  # Dieser Schlüssel hat keinen Wert
    "Abrechnungsziffer": "EBM123"
}


def create_plot_from_dict(data : dict, df : pd.DataFrame ):
    # Load the data
    #df = pd.read_csv("C:/Users/maxge/PycharmProjects/DatathonStads/Data/cgm-datathon-challenge-flu_riskgroupsv1.csv",  delimiter=';')
    keys_to_remove = {"vglMit", "yAchse", "diagrammart"}
    # Neues Dictionary ohne die unerwünschten Schlüssel
    data_neu = {key: value for key, value in data.items() if key not in keys_to_remove}
    print(data_neu)
    df_sorted = ft.filter(df,data_neu)  # Assuming no filtering is applied for now

    # Check the type of plot to create
    if data.get("diagrammart") == "zeitgraph":
        # Process data for Zeitgraph
        monthlyVaccDaten = cleanUpDataframe(df_sorted)

        # Create the plot
        plt.figure(figsize=(12, 6))
        if data.get("yAchse") == "Absolute Werte":
            plt.plot(monthlyVaccDaten['month'], monthlyVaccDaten['extrapolated'], marker='o', linestyle='-')
            plt.ylabel("Absolute Impfzahlen")
        else:
            ratios = calculateRatios()
            plt.plot(monthlyVaccDaten['month'], ratios, marker='o', linestyle='-')
            plt.ylabel("Ratios")

        # Customize the plot
        plt.xlabel("Monat")
        plt.title("Absolute Impfzahlen pro Monat")
        plt.xticks(rotation=45)
        plt.grid(True)
        plt.tight_layout()
        plt.show()

    elif data.get("diagrammart") == "vergleichsgraph":
        # Create the Vergleichsgraph
        plt.figure(figsize=(12, 6))
        df_sorted = df_sorted.groupby(data.get("vglMit"), as_index=False)["extrapolated"].sum()
        sns.barplot(data=df_sorted, x=data.get("vglMit"), y="extrapolated", palette="viridis")

        # Customize the plot
        plt.xlabel(data.get("vglMit"))
        plt.ylabel("Extrapolated Impfungen")
        plt.title(data.get("diagrammart") + " Vergleich von " + data.get("vglMit"))
        plt.xticks(rotation=45)
        plt.show()

    else:
        # Create an empty plot if no valid diagrammart is provided
        plt.figure(figsize=(6, 4))  # Set the figure size
        plt.title("Empty Plot")  # Add a title
        plt.xlabel("X-axis")  # Add X-axis label
        plt.ylabel("Y-axis")  # Add Y-axis label
        plt.grid(True)  # Add a grid (optional)
        plt.show()

    return plt

def calculateRatios():
    bundesland_populations = {
        "Nordrhein-Westfalen": 17925570,
        "Bayern": 13124737,
        "Baden-Württemberg": 11103043,
        "Niedersachsen": 8003421,
        "Hessen": 6293154,
        "Sachsen": 4056941,
        "Rheinland-Pfalz": 4098391,
        "Berlin": 3669491,
        "Schleswig-Holstein": 2910875,
        "Brandenburg": 2521893,
        "Sachsen-Anhalt": 2180684,
        "Thüringen": 2133378,
        "Hamburg": 1847253,
        "Mecklenburg-Vorpommern": 1610774,
        "Saarland": 986887,
        "Bremen": 680130
    }

    vaccination_ratios = {
        "Nordrhein-Westfalen": 0,
        "Bayern": 0,
        "Baden-Württemberg": 0,
        "Niedersachsen": 0,
        "Hessen": 0,
        "Sachsen": 0,
        "Rheinland-Pfalz": 0,
        "Berlin": 0,
        "Schleswig-Holstein": 0,
        "Brandenburg": 0,
        "Sachsen-Anhalt": 0,
        "Thüringen": 0,
        "Hamburg": 0,
        "Mecklenburg-Vorpommern": 0,
        "Saarland": 0,
        "Bremen": 0
    }



def cleanUpDataframe(df):
    df['week'] = pd.to_datetime(df['week'] + '-1', format='%Y-%W-%w')
    df['month'] = df['week'].dt.to_period('M')
    monthly_vaccinations = df.groupby('month')['extrapolated'].sum().reset_index()

    # Convert the 'month' column back to string for plotting
    monthly_vaccinations['month'] = monthly_vaccinations['month'].astype(str)

    return monthly_vaccinations
