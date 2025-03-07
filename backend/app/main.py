from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

@app.get("/image")
def get_image():
    """API-Endpunkt, um das PNG-Bild abzurufen"""
    return get_png_file()