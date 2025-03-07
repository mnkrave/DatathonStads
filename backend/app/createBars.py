import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
# Datei laden (passt den Pfad an, wenn nötig)
df = pd.read_csv("D:/Datathon/backend/Data/data.csv",
                 encoding='utf-8', delimiter=';')
#df = pd.read_csv("Data/20025-03-07_cgm-datathon-challenge-flu_riskgroupsv1.csv")

def plotBarBundeslandVac(df : pd.DataFrame) -> plt.Figure:
# Sort the DataFrame for better readability
    bundeslaender_vaccinations = df.sort_values(by="extrapolated", ascending=False)

    # Create a bar plot
    plt.figure(figsize=(12, 6))
    sns.barplot(data=bundeslaender_vaccinations, x="kvregion", y="extrapolated", palette="viridis")

    # Customize labels and title
    plt.xlabel("Bundesland")
    plt.ylabel("Extrapolated Vaccinations")
    plt.title("Total Extrapolated Vaccinations by Bundesland")
    plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
    plt.show()


    img_io = io.BytesIO()
    plt.savefig(img_io, format="png", dpi=300, bbox_inches='tight')
    plt.close()
    return img_io

plotBarBundeslandVac(df)
