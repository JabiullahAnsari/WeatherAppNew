import React, { useState } from "react";

const API_KEY = "YOUR_API_KEY"; // apna OpenWeather API key yaha daalo

export default function SearchBox({ onWeatherData }) {
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      // 1. Get coordinates from city
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      if (!geoData[0]) {
        alert("City not found!");
        return;
      }
      const { lat, lon } = geoData[0];

      // 2. Fetch weather (current, hourly, daily)
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      // Send back to App.jsx
      onWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
    </div>
  );
}
