import os
from fastapi.responses import FileResponse

def get_png_file():
    """Lädt das PNG-Bild und gibt es als Datei-Response zurück"""
    file_path = os.path.join("images", "smile.png")

    # Überprüfen, ob die Datei existiert
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Datei nicht gefunden: {file_path}")

    # Gibt die Datei als Antwort zurück
    return FileResponse(file_path, media_type="image/png")
