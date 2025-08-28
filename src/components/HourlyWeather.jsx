import React, { useEffect, useState } from "react";

export default function HourlyWeather({ lat, lon, place }) {
  const [hourly, setHourly] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,rain,weathercode,windspeed_10m,winddirection_10m&timezone=auto`
    )
      .then((r) => r.json())
      .then((j) => setHourly(j.hourly))
      .catch((e) => console.error(e));
  }, [lat, lon]);

  if (!hourly) return <p>Loading hourly forecast...</p>;

  const WMAP = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    61: "Rain showers",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Snow",
    95: "Thunderstorm",
  };

  const degToCompass = (deg) => {
    if (!deg && deg !== 0) return "-";
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  const handleHourClick = (i) => {
    setSelectedHour(selectedHour === i ? null : i);
  };

  return (
    <section className="card">
      <h2>Hourly — {place}</h2>
      <div className="daily-grid">
        {hourly.time.map((t, i) => {
          const dateObj = new Date(t);
          const dateStr = dateObj.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          const timeStr = dateObj.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={t}
              className={`cursor-pointer rounded-lg p-2 transition ${
                selectedHour === i ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => handleHourClick(i)}
            >
              {/* Card summary */}
              <div className="text-xs text-gray-500">{timeStr}</div>
              <div className="text-sm font-medium">
                {hourly.temperature_2m[i]}°C
              </div>
              <div className="text-xs">
                🌧 {hourly.precipitation_probability[i]}%
              </div>

              {/* Details toggle inside this card */}
              {selectedHour === i && (
                <div className="mt-2 p-2 border rounded-lg bg-white text-sm shadow">
                  <div className="font-semibold text-gray-700 mb-1">
                    📅 {dateStr} — {timeStr}
                  </div>
                  <div>🌡️ Temp: {hourly.temperature_2m[i]}°C</div>
                  <div>
                    🌧️ Precip Prob: {hourly.precipitation_probability[i]}%
                  </div>
                  <div>💧 Rain: {hourly.rain?.[i] ?? 0} mm</div>
                  <div>💨 Wind: {hourly.windspeed_10m[i]} km/h</div>
                  <div>
                    🧭 Direction: {degToCompass(hourly.winddirection_10m[i])}
                  </div>
                  <div>
                    🌤️ Condition: {WMAP[hourly.weathercode?.[i]] || "Unknown"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
