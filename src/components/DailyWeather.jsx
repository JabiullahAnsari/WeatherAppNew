import React, { useEffect, useState } from "react";

export default function DailyWeather({ lat, lon, place }) {
  const [daily, setDaily] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_mean,windspeed_10m_max,winddirection_10m_dominant,sunrise,sunset,weathercode&timezone=auto`
    )
      .then((r) => r.json())
      .then((j) => setDaily(j.daily))
      .catch((e) => console.error(e));
  }, [lat, lon]);

  if (!daily) return <p>Loading daily forecast...</p>;

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

  const handleDayClick = (i) => {
    if (selectedDay === i) {
      setSelectedDay(null); // dobara click -> close
    } else {
      setSelectedDay(i); // new day select
    }
  };

  return (
    <section className="card ">
      <h2>Daily — {place}</h2>
      <div className="daily-grid">
        {daily.time.map((d, i) => (
          <div
            className={`day cursor-pointer transition rounded-lg p-2 ${
              selectedDay === i ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            key={d}
            onClick={() => handleDayClick(i)}
          >
            <div className="muted">
              {new Date(d).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div>Max: {daily.temperature_2m_max[i]}°C</div>
            <div>Min: {daily.temperature_2m_min[i]}°C</div>
            <div>Precip: {daily.precipitation_sum?.[i] ?? 0} mm</div>
          </div>
        ))}
      </div>

      {selectedDay !== null && (
        <div className="card mt-4 p-4 border rounded-xl shadow-md bg-white">
          <h3 className="font-bold text-lg mb-2">
            Details —{" "}
            {new Date(daily.time[selectedDay]).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="p-2 border rounded-lg">
              🌡️ Temp Max: {daily.temperature_2m_max[selectedDay]}°C
            </div>
            <div className="p-2 border rounded-lg">
              🌡️ Temp Min: {daily.temperature_2m_min[selectedDay]}°C
            </div>
            <div className="p-2 border rounded-lg">
              🌧️ Precipitation: {daily.precipitation_sum?.[selectedDay] ?? 0} mm
            </div>
            <div className="p-2 border rounded-lg">
              ☔ Precip Prob: {daily.precipitation_probability_mean?.[selectedDay] ?? 0}%
            </div>
            <div className="p-2 border rounded-lg">
              💨 Wind: {daily.windspeed_10m_max?.[selectedDay]} km/h
            </div>
            <div className="p-2 border rounded-lg">
              🧭 Direction: {degToCompass(daily.winddirection_10m_dominant?.[selectedDay])}
            </div>
            <div className="p-2 border rounded-lg">
              🌤️ Condition: {WMAP[daily.weathercode?.[selectedDay]] || "Unknown"}
            </div>
            <div className="p-2 border rounded-lg">
              🌅 Sunrise: {new Date(daily.sunrise[selectedDay]).toLocaleTimeString()}
            </div>
            <div className="p-2 border rounded-lg">
              🌇 Sunset: {new Date(daily.sunset[selectedDay]).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
