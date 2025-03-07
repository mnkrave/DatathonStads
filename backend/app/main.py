from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}


def get_png_file():
    """ Lädt ein gespeichertes PNG-Bild aus dem Ordner 'images/' """
    file_path = os.path.join("images", "diagramm.png")

    # Überprüfen, ob die Datei existiert
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Datei nicht gefunden: {file_path}")

    return file_path  # Gibt den Dateipfad zurück