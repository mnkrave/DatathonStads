# Nutze eine offizielle Python-Version mit SSL-Support
FROM python:3.9-slim

# Stelle sicher, dass SSL funktioniert (installiere fehlende Pakete)
RUN apt-get update && apt-get install -y \
    libssl-dev libffi-dev python3-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die Abhängigkeitsdatei und installiere Pakete
COPY requirements.txt .
RUN pip install --upgrade pip  # Sicherstellen, dass pip aktuell ist
RUN pip install --no-cache-dir -r requirements.txt

# Kopiere den restlichen Code ins Container-Verzeichnis
COPY . .

# Starte FastAPI-Server
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
