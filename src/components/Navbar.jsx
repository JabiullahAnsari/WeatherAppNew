import React from "react";

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = ["current", "hourly", "daily", "monthly", "yearly"];
  return (
    <nav className="navbar">
      {tabs.map((t) => (
        <button
          key={t}
          className={activeTab === t ? "tab active" : "tab"}
          onClick={() => setActiveTab(t)}
        >
          {t[0].toUpperCase() + t.slice(1)}
        </button>
      ))}
    </nav>
  );
}
