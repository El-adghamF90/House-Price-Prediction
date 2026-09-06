import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPrediction } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";
import locations from "../locations.json";

export default function PredictionForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<PredictionRequest>({
    location: locations[0],
    carpet_area_sqft: 0,
    floor_num: 0,
    bathroom: 1,
    balcony: 0,
    furnishing: "Unfurnished",
    transaction: "Resale",
    ownership: "Freehold",
    facing: "East",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "carpet_area_sqft" || name === "floor_num" || name === "bathroom" || name === "balcony"
        ? Number(value)
        : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.carpet_area_sqft <= 0) {
      setError("Carpet area must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const result = await getPrediction(form);
      navigate("/result", { state: { price: result.predicted_price } });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location:
        <select name="location" value={form.location} onChange={handleChange}>
          {locations.map((loc: string) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </label>

      <label>
        Carpet Area (sqft):
        <input type="number" name="carpet_area_sqft" value={form.carpet_area_sqft} onChange={handleChange} />
      </label>

      <label>
        Floor Number:
        <input type="number" name="floor_num" value={form.floor_num} onChange={handleChange} />
      </label>

      <label>
        Bathrooms:
        <input type="number" name="bathroom" value={form.bathroom} onChange={handleChange} />
      </label>

      <label>
        Balconies:
        <input type="number" name="balcony" value={form.balcony} onChange={handleChange} />
      </label>

      <label>
        Furnishing:
        <select name="furnishing" value={form.furnishing} onChange={handleChange}>
          <option>Furnished</option>
          <option>Semi-Furnished</option>
          <option>Unfurnished</option>
        </select>
      </label>

      <label>
        Transaction:
        <select name="transaction" value={form.transaction} onChange={handleChange}>
          <option>New Property</option>
          <option>Resale</option>
        </select>
      </label>

      <label>
        Ownership:
        <select name="ownership" value={form.ownership} onChange={handleChange}>
          <option>Freehold</option>
          <option>Co-operative Society</option>
          <option>Leasehold</option>
        </select>
      </label>

      <label>
        Facing:
        <select name="facing" value={form.facing} onChange={handleChange}>
          <option>East</option>
          <option>West</option>
          <option>North</option>
          <option>South</option>
        </select>
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Get Prediction"}
      </button>
    </form>
  );
}