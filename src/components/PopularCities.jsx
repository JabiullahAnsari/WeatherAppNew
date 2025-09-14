import React from "react";
import "./PopularCities.css";

const cities = [
  { name: "Delhi", country: "India", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777 },
  { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707 },
  { name: "Bengaluru", country: "India", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", country: "India", lat: 17.385, lon: 78.4867 },
  { name: "Pune", country: "India", lat: 18.5204, lon: 73.8567 },
  { name: "Jaipur", country: "India", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", country: "India", lat: 26.8467, lon: 80.9462 },
  { name: "Kanpur", country: "India", lat: 26.4499, lon: 80.3319 },
  { name: "Nagpur", country: "India", lat: 21.1458, lon: 79.0882 },
  { name: "Indore", country: "India", lat: 22.7196, lon: 75.8577 },
  { name: "Bhopal", country: "India", lat: 23.2599, lon: 77.4126 },
  { name: "Patna", country: "India", lat: 25.5941, lon: 85.1376 },
  { name: "Varanasi", country: "India", lat: 25.3176, lon: 82.9739 },
  { name: "Surat", country: "India", lat: 21.1702, lon: 72.8311 },
];

export default function PopularCities({ onSelectCity }) {
  return (
    <section className="popular-cities">
      <h2 className="popular-heading">🌟 Popular Cities</h2>
      <div className="city-grid">
        {cities.map((c) => (
          <button
            key={c.name}
            className="city-card"
            onClick={() => onSelectCity(c)}
          >
            {c.name}, {c.country}
          </button>
        ))}
      </div>
    </section>
  );
}
