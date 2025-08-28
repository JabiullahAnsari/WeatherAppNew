// src/components/YearlyWeather.jsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function YearlyWeather({ lat, lon }) {
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const json = await res.json();

        // Daily data ko yearly average me group karna
        const grouped = {};
        json.daily.time.forEach((date, i) => {
          const year = date.slice(0, 4); // YYYY
          if (!grouped[year]) grouped[year] = { temps: [] };
          grouped[year].temps.push((json.daily.temperature_2m_max[i] + json.daily.temperature_2m_min[i]) / 2);
        });

        const yearlyArr = Object.entries(grouped).map(([year, val]) => ({
          year,
          avgTemp: (val.temps.reduce((a, b) => a + b, 0) / val.temps.length).toFixed(1),
        }));

        setYearlyData(yearlyArr);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [lat, lon]);

  if (!yearlyData.length) return <p>Loading yearly data...</p>;

  return (
    <div className="p-6 rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">📊 Yearly Average Temperature</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={yearlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="avgTemp" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
