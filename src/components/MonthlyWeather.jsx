// src/components/MonthlyWeather.jsx
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function MonthlyWeather({ lat, lon }) {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const json = await res.json();

        // Daily data ko monthly average me group karna
        const grouped = {};
        json.daily.time.forEach((date, i) => {
          const month = date.slice(0, 7); // YYYY-MM
          if (!grouped[month]) grouped[month] = { temps: [] };
          grouped[month].temps.push((json.daily.temperature_2m_max[i] + json.daily.temperature_2m_min[i]) / 2);
        });

        const monthlyArr = Object.entries(grouped).map(([month, val]) => ({
          month,
          avgTemp: (val.temps.reduce((a, b) => a + b, 0) / val.temps.length).toFixed(1),
        }));

        setMonthlyData(monthlyArr);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [lat, lon]);

  if (!monthlyData.length) return <p>Loading monthly data...</p>;

  return (
    <div className="p-6 rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">📊 Monthly Average Temperature</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="avgTemp" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
