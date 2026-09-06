from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_predict_invalid_input():
    response = client.post("/predict", json={"location": "mumbai"})
    assert response.status_code == 422