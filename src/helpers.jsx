// // Weather code mapping
// export const WMAP = {
//   0: "☀️ Clear", 1: "🌤 Mainly clear", 2: "⛅ Partly cloudy", 3: "☁️ Overcast",
//   45: "🌫 Fog", 48: "🌫 Depositing rime fog",
//   51: "🌦 Drizzle", 53: "🌦 Drizzle", 55: "🌦 Drizzle",
//   56: "🌧 Freezing drizzle", 57: "🌧 Freezing drizzle",
//   61: "🌧 Rain", 63: "🌧 Rain", 65: "🌧 Heavy rain",
//   66: "🌧 Freezing rain", 67: "🌧 Freezing rain",
//   71: "❄️ Snow", 73: "❄️ Snow", 75: "❄️ Heavy snow", 77: "❄️ Snow grains",
//   80: "🌧 Rain showers", 81: "🌧 Rain showers", 82: "🌧 Violent rain",
//   85: "❄️ Snow showers", 86: "❄️ Snow showers",
//   95: "⛈ Thunderstorm", 96: "⛈ Thunder + hail", 97: "⛈ Thunder + hail"
// };

// export const degToCompass = (deg) => {
//   const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
//   return dirs[Math.round(deg/22.5) % 16];
// };

// export const avg = (arr) => arr.reduce((a,b)=>a+b,0)/arr.length;

// export const changeBackgroundClass = (code) => {
//   if(code === 0) return "sunny";
//   else if([1,2,3,45,48].includes(code)) return "cloudy";
//   else if([51,53,55,61,63,65,66,67,80,81,82,95,96,97].includes(code)) return "rainy";
//   else if([71,73,75,77,85,86].includes(code)) return "snow";
//   else return "night";
// };
