import joblib

model = joblib.load("models/house_price.pkl")

def predict_price(df):
    return float(model.predict(df)[0])