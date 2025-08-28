import React from "react";

export default function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      {/* Current */}
      {weather.type === "current" && weather.current_weather && (
        <>
          <h2>🌍 Current Weather</h2>
          <p>🌡 Temp: {weather.current_weather.temperature}°C</p>
          <p>💨 Wind: {weather.current_weather.windspeed} km/h</p>
        </>
      )}

      {/* Hourly */}
      {weather.type === "hourly" && weather.hourly?.time && (
        <>
          <h2>⏱ Hourly Forecast</h2>
          <ul>
            {weather.hourly.time.slice(0, 12).map((time, i) => (
              <li key={time}>
                {time} → {weather.hourly.temperature_2m[i]}°C, 💨{" "}
                {weather.hourly.windspeed_10m[i]} km/h
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Daily */}
      {weather.type === "daily" && weather.daily?.time && (
        <>
          <h2>📅 7-Day Forecast</h2>
          <ul>
            {weather.daily.time.map((date, i) => (
              <li key={date}>
                {date} → Min {weather.daily.temperature_2m_min[i]}°C / Max{" "}
                {weather.daily.temperature_2m_max[i]}°C, 💧{" "}
                {weather.daily.precipitation_sum[i]} mm
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Monthly */}
      {weather.type === "monthly" && weather.daily?.time && (
        <>
          <h2>📆 Monthly Climate</h2>
          <ul>
            {weather.daily.time.map((date, i) => (
              <li key={date}>
                {date} → Min {weather.daily.temperature_2m_min[i]}°C / Max{" "}
                {weather.daily.temperature_2m_max[i]}°C, 💧{" "}
                {weather.daily.precipitation_sum[i]} mm
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Yearly */}
      {weather.type === "yearly" && weather.daily?.time && (
        <>
          <h2>📆 Yearly Climate</h2>
          <ul>
            {weather.daily.time.map((date, i) => (
              <li key={date}>
                {date} → Min {weather.daily.temperature_2m_min[i]}°C / Max{" "}
                {weather.daily.temperature_2m_max[i]}°C, 💧{" "}
                {weather.daily.precipitation_sum[i]} mm
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
