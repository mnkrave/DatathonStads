from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import io
from fastapi.responses import StreamingResponse

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Für Debugging offen, später spezifisch setzen!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/get_image/test_image", response_model=DiagramResponse)
async def get_image(request: DiagramRequest):
    """
    Nimmt ein DiagramRequest entgegen und gibt ein Base64-Bild zurück.
    """
    # 1) Hier könnt ihr die empfangenen Filter/Parameter verarbeiten:
    #    z.B. request.diagrammart, request.sortierart, request.Region, ...
    print("Request-Daten:", request.dict())

    # 2) Bestimmt anhand der Filter das richtige Bild (hier nur ein Beispiel):
    image_path = os.path.join("images", "test_image.png")

    # 3) Bild in Base64 konvertieren
    with open(image_path, "rb") as f:
        image_bytes = f.read()
    image_base64_str = base64.b64encode(image_bytes).decode("utf-8")

    # 4) Modell zurückgeben (DiagramResponse)
    return DiagramResponse(image_base64=image_base64_str)



# 🟢 POST-Route für Bildabruf mit JSON
@app.post("/get_image/test_image/old")
async def get_image(request: ImageRequest):
    """Nimmt eine JSON mit 'filename' entgegen und gibt das Bild zurück."""
    # 🔹 Pfad zum angeforderten Bild setzen
    image_path = os.path.join("images", "test_image.png")

    # 🔹 Prüfen, ob die Datei existiert
    if not os.path.exists(image_path):
        return {"error": "Bild nicht gefunden"}

    # 🔹 Datei als Antwort zurückgeben
    return FileResponse(image_path, media_type="image/png")

@app.get("/get_image")
async def get_image():
    """Gibt das angeforderte Bild als Bitstream zurück."""

    # 🔹 Der Pfad zum Bild
    image_path = os.path.join("images", "test_image.png")

    # 🔹 Prüfen, ob die Datei existiert
    if not os.path.exists(image_path):
        return {"error": "Bild nicht gefunden"}

    # 🔹 Bild als Bitstream zurückgeben
    with open(image_path, "rb") as image_file:
        img_bytes = io.BytesIO(image_file.read())
        return StreamingResponse(img_bytes, media_type="image/png")

