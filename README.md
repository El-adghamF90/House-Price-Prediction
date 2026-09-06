# House Price Prediction — End-to-End ML Web App

An end-to-end machine learning project that predicts Indian house prices from property details, built as part of the ITI internship final project.

## Overview

This project takes a messy, real-world Kaggle dataset of ~187,000 Indian property listings, cleans it, trains a regression model, and serves predictions through a web app:

- **Jupyter Notebook** — cleans the data, engineers features, trains and compares 2 models
- **FastAPI backend** — loads the trained model and serves predictions via REST API
- **React frontend** — a form where users enter property details and see a predicted price

## Architecture


## Tech Stack

- **Data/ML:** Python, pandas, scikit-learn, matplotlib, seaborn
- **Backend:** FastAPI, Pydantic, Uvicorn
- **Frontend:** React, TypeScript, Vite, React Router

## Project Structure


## Dataset

**House Price** by Juhi Bhojani — https://www.kaggle.com/datasets/juhibhojani/house-price

### Download instructions

```bash
pip install kaggle
kaggle auth login
kaggle datasets download -d juhibhojani/house-price -p notebooks/data --unzip
```

## Setup — Notebook

```bash
pip install pandas numpy scikit-learn matplotlib seaborn joblib
```

Run `notebooks/house_price_model.ipynb` top to bottom. This generates `house_price.pkl` and `locations.json`, which you then copy into `backend/models/` and `backend/app/` respectively.

## Setup — Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Once running, the backend is available at:
- **API:** http://localhost:8000
- **Interactive docs:** http://localhost:8000/docs

No environment variables are required for the backend.

### API Reference

The backend exposes two endpoints.

**1. Health check** — confirms the server is running.

```bash
curl http://localhost:8000/health
```

Returns:
```json
{"status": "ok"}
```

**2. Price prediction** — takes property details, returns a predicted price.

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"location": "mumbai", "carpet_area_sqft": 800, "floor_num": 3, "bathroom": 2, "balcony": 1, "furnishing": "Furnished", "transaction": "Resale", "ownership": "Freehold", "facing": "East"}'
```

Returns:
```json
{"predicted_price": 34381000.0}
```
## Setup — Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on **http://localhost:5173**.

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

## Model Metrics (Random Forest — chosen model)

| Metric | Linear Regression | Random Forest |
|---|---|---|
| MAE | 4,687,514.53 | 1,354,452.18 |
| RMSE | 8,890,564.45 | 5,705,804.46 |
| R² | 0.5776 | 0.8260 |

Random Forest was selected as the final model due to its substantially higher R² and lower error, reflecting its ability to capture non-linear relationships between property features and price.

## Screenshots

*(Add screenshots of the running app here)*

## Notes

- The raw dataset CSV and the trained `.pkl` model are excluded from this repository (large files) — regenerate them by following the notebook and dataset instructions above.