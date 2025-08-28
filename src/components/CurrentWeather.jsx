import React, { useEffect, useState } from "react";

export default function CurrentWeather({ lat, lon, place }) {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m,winddirection_10m,weathercode,precipitation_probability,cloudcover&daily=sunrise,sunset&timezone=auto&forecast_days=1`
    )
      .then((r) => r.json())
      .then((j) => {
        if (j.current && j.daily) {
          setCurrent({
            time: new Date().toLocaleString(),
            temp: j.current.temperature_2m,
            humidity: j.current.relative_humidity_2m,
            wind: j.current.windspeed_10m,
            dir: j.current.winddirection_10m,
            code: j.current.weathercode,
            precip: j.current.precipitation_probability ?? 0,
            cloud: j.current.cloudcover,
            sunrise: j.daily.sunrise[0],
            sunset: j.daily.sunset[0],
          });
        }
      })
      .catch((e) => console.error(e));
  }, [lat, lon]);

  if (!current) return <p>Loading current weather...</p>;

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

  return (
    <section className="card">
      <h2>Current Weather — {place}</h2>
      <div className="daily-grid">
        <div className="day">
          <div className="muted">Temperature</div>
          <div>{current.temp}°C</div>
        </div>
        <div className="day">
          <div className="muted">Condition</div>
          <div>{WMAP[current.code] || "Unknown"}</div>
        </div>
        <div className="day">
          <div className="muted">Humidity</div>
          <div>{current.humidity}%</div>
        </div>
        <div className="day">
          <div className="muted">Wind</div>
          <div>{current.wind} km/h</div>
        </div>
        <div className="day">
          <div className="muted">Direction</div>
          <div>{degToCompass(current.dir)}</div>
        </div>
        <div className="day">
          <div className="muted">Precipitation</div>
          <div>{current.precip}%</div>
        </div>
        <div className="day">
          <div className="muted">Cloud Cover</div>
          <div>{current.cloud}%</div>
        </div>
        <div className="day">
          <div className="muted">Sunrise</div>
          <div>{new Date(current.sunrise).toLocaleTimeString()}</div>
        </div>
        <div className="day">
          <div className="muted">Sunset</div>
          <div>{new Date(current.sunset).toLocaleTimeString()}</div>
        </div>
      </div>
    </section>
  );
}
