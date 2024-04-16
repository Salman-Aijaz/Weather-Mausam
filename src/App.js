import "./App.css";
import { useState } from "react";
import Animation from "../src/Assests/error.json";
import Lottie from "lottie-react";
import { BiDroplet } from "react-icons/bi";
import { RiTempHotLine } from "react-icons/ri";
import { RiTempColdLine } from "react-icons/ri";

const api = {
  key: "f785b81a25ab91f311bd7dd06ec7e508",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");

  const search = (evt) => {
      if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&APPID=${api.key}&units=metric`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            setQuery("");
            if (query != result.name) {
              setCity(
                <div >
                  <Lottie className="icon" animationData={Animation} />
                  <h3 className="text"> Try Again</h3>
                </div>
              );
            }
          });
      }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp >= 30
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main
        className={
          typeof weather.main != "undefined" ? "gradient-background" : ""
        }
      >
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.floor(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="feel-like">
                Feel Like {Math.round(weather.main.feels_like / 10)}°C
              </div>
              <div className="temp-info">
                <div className="humidity">
                  <span className="humidity-text">
                    Humidity <BiDroplet className="drop-icon" />
                  </span>
                  <br />
                  {weather.main.humidity}%
                </div>
                <div className="temp-max">
                  <span className="max-temp-text">
                    MaxTemp <RiTempHotLine className="temp-hot" />{" "}
                  </span>
                  <br />
                  {Math.round(weather.main.temp_max / 10)}°C
                </div>
                <div className="temp-min">
                  <span className="min-temp-text">
                    MinTemp<RiTempColdLine className="temp-cold" />{" "}
                  </span>
                 <br />
                  {Math.round(weather.main.temp_min / 10)}°C
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="write">{city}</div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
