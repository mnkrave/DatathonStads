# 1️⃣ Nutzt ein offizielles Python-Image als Basis
FROM python:3.9

# 2️⃣ Setzt das Arbeitsverzeichnis im Container
WORKDIR /app

# 3️⃣ Kopiert die Abhängigkeitsdatei und installiert Pakete
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4️⃣ Kopiert den Rest des Codes ins Container-Verzeichnis
COPY . .

# 5️⃣ Startet den FastAPI-Server (mit automatischem Reload für Entwicklung)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
