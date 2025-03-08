import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("C:/Users/maxge/PycharmProjects/DatathonStads/Data/cgm-datathon-challenge-flu_riskgroupsv1.csv", delimiter=';')

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

#Dict mit den Ratios pro Bundesland
bundesland_vaccinationRatios = {'Nordrhein-Westfalen': 0.1960690231886629, 'Bayern': 0.12425346123126124, 'Baden-Württemberg': 0.13262679429414082, 'Niedersachsen': 0.21475104208562815, 'Hessen': 0.18534617141102855, 'Sachsen': 0.2093037586694014, 'Rheinland-Pfalz': 0.180940764314581, 'Berlin': 0.224706369357494, 'Schleswig-Holstein': 0.22865324000515308, 'Brandenburg': 0.15270314799240095, 'Sachsen-Anhalt': 0.3251663239607389, 'Thüringen': 0.27067683270381526, 'Hamburg': 0.13646695931742972, 'Mecklenburg-Vorpommern': 0.23060032009456324, 'Saarland': 0.2368102933770533, 'Bremen': 0.21035390293032213}

#Methode um total Männer und frauen zu bekommen
def get_total_vaccinated_gender(df):
    total_male = df[df['gender'] == 'm']['extrapolated'].sum()
    total_female = df[df['gender'] == 'f']['extrapolated'].sum()
    return {"Männer": total_male, "Frauen": total_female}

#Methode um Geimpfte Männer und Frauen pro Bundesland zu bekommen
def get_vaccinated_gender_by_bundesland(df, bundesland):
    bundesland_data = df[df['kvregion'] == bundesland]
    male = bundesland_data[bundesland_data['gender'] == 'm']['extrapolated'].sum()
    female = bundesland_data[bundesland_data['gender'] == 'f']['extrapolated'].sum()
    return {"Bundesland": bundesland, "Männer": male, "Frauen": female}
