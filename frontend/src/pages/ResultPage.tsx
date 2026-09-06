import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const price = location.state?.price;

  if (price === undefined) {
    return (
      <div>
        <p>No prediction found.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Predicted Price</h1>
      <p>₹ {price.toLocaleString("en-IN")}</p>
      <button onClick={() => navigate("/")}>Make Another Prediction</button>
    </div>
  );
}