from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

@app.get("/image")
def get_image():
    # Pfad anpassen: Hier wird angenommen, dass "ist.png" im selben Ordner wie main.py liegt
    # oder in einem Unterordner wie "./images/ist.png".
    file_path = os.path.join("images","test.png")
    return FileResponse(file_path, media_type="image/png")