from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

@app.get("/diagram")
def read_root(settings: dict):
    test_data = {
            "x_values": [1, 2, 3, 4, 5],
            "y_values": [10, 15, 7, 20, 12],
            "color": "red",
            "title": "Test-Diagramm"
        }
    return test_data