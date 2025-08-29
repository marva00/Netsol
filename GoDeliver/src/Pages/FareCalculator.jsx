import React, { useState } from "react";
import axios from "axios";
import "./FareCalculator.css";

function FareCalculator() {
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    mode: "truck",
    weight: ""
  });

  const [estimate, setEstimate] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);

  // ✅ Fetch suggestions from OpenStreetMap Nominatim
  const fetchSuggestions = async (value, field) => {
    if (value.length < 2) return;

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${value}&format=json&limit=5`
      );

      const cities = res.data.map((c) => c.display_name);
      if (field === "pickup") setPickupSuggestions(cities);
      if (field === "destination") setDestSuggestions(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "pickup") fetchSuggestions(value, "pickup");
    if (name === "destination") fetchSuggestions(value, "destination");
  };

  const handleSuggestionClick = (field, city) => {
    setForm((prev) => ({ ...prev, [field]: city }));
    if (field === "pickup") setPickupSuggestions([]);
    if (field === "destination") setDestSuggestions([]);
  };

  const calculateFare = (e) => {
    e.preventDefault();
    if (!form.pickup || !form.destination || !form.weight) {
      alert("Please fill all required fields");
      return;
    }

    const weight = parseFloat(form.weight);
    if (isNaN(weight) || weight <= 0) {
      alert("Enter valid weight");
      return;
    }

    const baseRate = form.mode === "truck" ? 15 : 8;
    const cost = Math.round(baseRate * weight * 1.5);
    setEstimate(cost);
  };

  return (
    <div className="fare-page">
      <div className="fare-card">
        <h1 className="fare-title">Quick Quote</h1>
        <p className="fare-subtitle">Get your instant delivery cost estimate</p>

        <form className="fare-form" onSubmit={calculateFare}>
          <div className="form-row">
            {/* Pickup City */}
            <div className="autocomplete">
              <input
                type="text"
                name="pickup"
                value={form.pickup}
                onChange={handleChange}
                placeholder="📍 Pickup City"
                required
              />
              {pickupSuggestions.length > 0 && (
                <ul className="suggestions">
                  {pickupSuggestions.map((city, i) => (
                    <li key={i} onClick={() => handleSuggestionClick("pickup", city)}>
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Destination City */}
            <div className="autocomplete">
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="🎯 Destination City"
                required
              />
              {destSuggestions.length > 0 && (
                <ul className="suggestions">
                  {destSuggestions.map((city, i) => (
                    <li key={i} onClick={() => handleSuggestionClick("destination", city)}>
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          
            {/* Mode Selection */}
            <select name="mode" value={form.mode} onChange={handleChange}>
              <option value="truck">🚛 Truck</option>
              <option value="train">🚂 Train</option>
            </select>

            {/* Weight */}
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="⚖ Weight (kg)"
              min="0.1"
              step="0.1"
              required
            />

            {/* Button */}
            <button type="submit" className="fare-btn">
              Calculate
            </button>
          </div>
        </form>

        {estimate && (
          <div className="fare-result">
            <h3>Estimated Cost</h3>
            <p>PKR {estimate.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FareCalculator;

