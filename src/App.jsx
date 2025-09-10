import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import MonthlyWeather from "./components/MonthlyWeather";
import YearlyWeather from "./components/YearlyWeather";
import PopularCities from "./components/PopularCities"; 

export default function App() {
  const [activeTab, setActiveTab] = useState("current");
  const [cityInput, setCityInput] = useState("");
  const [coords, setCoords] = useState({
    lat: null,
    lon: null,
    name: null,
    country: null,
  });

  const handleSearch = async () => {
    const city = cityInput.trim();
    if (!city) return alert("Enter city name");
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );
      const json = await res.json();
      if (!json.results || json.results.length === 0)
        return alert("City not found");
      const p = json.results[0];
      setCoords({
        lat: p.latitude,
        lon: p.longitude,
        name: p.name,
        country: p.country,
      });
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  // Use my location button
  const useMyLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const rev = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1`
          );
          const rd = await rev.json();
          const p = rd.results?.[0] ?? { name: "Your location", country: "" };
          setCoords({ lat, lon, name: p.name, country: p.country });
        } catch (e) {
          console.error(e);
          setCoords({ lat, lon, name: "Your location", country: "" });
        }
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Weather Dashboard</h1>
        <div className="header-actions">
          <input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter city..."
            className="search-input"
          />
          <button onClick={handleSearch} className="btn">
            Search
          </button>
          <button onClick={useMyLocation} className="btn outline">
            Use My Location
          </button>
        </div>
      </header>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="content">
        {!coords.lat ? (
          <>
            <div className="placeholder">
              🔎 Search a city or use your location to load weather
            </div>
            {/* ✅ Popular Cities sirf tab show hoga jab city select nahi hai */}
            <PopularCities
              onSelectCity={(city) =>
                setCoords({
                  lat: city.lat,
                  lon: city.lon,
                  name: city.name,
                  country: city.country || "",
                })
              }
            />
          </>
        ) : (
          <>
            {activeTab === "current" && (
              <CurrentWeather
                lat={coords.lat}
                lon={coords.lon}
                place={`${coords.name}${
                  coords.country ? ", " + coords.country : ""
                }`}
              />
            )}
            {activeTab === "hourly" && (
              <HourlyWeather
                lat={coords.lat}
                lon={coords.lon}
                place={coords.name}
              />
            )}
            {activeTab === "daily" && (
              <DailyWeather
                lat={coords.lat}
                lon={coords.lon}
                place={coords.name}
              />
            )}
            {activeTab === "monthly" && (
              <MonthlyWeather lat={coords.lat} lon={coords.lon} />
            )}
            {activeTab === "yearly" && (
              <YearlyWeather lat={coords.lat} lon={coords.lon} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
