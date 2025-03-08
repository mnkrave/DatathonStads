
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


# Provide the full path or relative path to your CSV file
file_path = "Data/cgm-datathon-challenge-flu_riskgroupsv1.csv"  # Example: "C:/Users/your_name/Documents/data.csv"


df = pd.read_csv(file_path)

# Group by kvregion (Bundesland) and sum the extrapolated vaccination counts
bundeslaender_vaccinations = df.groupby('kvregion')['extrapolated'].sum().reset_index()

plt.figure(figsize=(12, 6))
sns.barplot(data=bundeslaender_vaccinations, x="kvregion", y="extrapolated", palette="viridis")

# Customize labels and title
plt.xlabel("Bundesland")
plt.ylabel("Extrapolated Vaccinations")
plt.title("Total Extrapolated Vaccinations by Bundesland")
plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
plt.show()


# Sort by vaccination count in descending order
sorted_bundeslaender = bundeslaender_vaccinations.sort_values('extrapolated', ascending=False)

# Display the sorted listby total vaccinations
#print(sorted_bundeslaender)

# Group by kvregion (Bundesland) and sum the extrapolated vaccination counts
bundeslaender_vaccinations = df.groupby('kvregion')['extrapolated'].sum().reset_index()


# Sort by vaccination count in descending order
sorted_bundeslaender = bundeslaender_vaccinations.sort_values('extrapolated', ascending=False)

# Display the sorted list
#print(sorted_bundeslaender)

# Dictionary with populations for each Bundesland
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

# Function to calculate vaccination ratios
vaccination_ratios = {
    "Nordrhein-Westfalen":0,
    "Bayern":0,
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

for bundesland in bundesland_populations.keys():
    vaccination_ratios[bundesland] = bundeslaender_vaccinations.loc[bundeslaender_vaccinations['kvregion'] == bundesland, 'extrapolated'].values[0] / bundesland_populations[bundesland]


#print(vaccination_ratios)

