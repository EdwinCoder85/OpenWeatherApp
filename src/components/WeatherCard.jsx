import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import "./styles/WeatherCard.css";

const WeatherCard = ({ color, backgroundColor, inputValue }) => {
  const [latitude, setLatitude] = useState(-9.08528);
  const [longitude, setLongitude] = useState(-78.57833);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [unit, setUnit] = useState("metric");
  const [symbol, setSymbol] = useState("C°");
  const [isBoolean, setIsBoolean] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hoy = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleTemperatureScale = () => {
    if (isBoolean) {
      setUnit("metric");
      setSymbol("°C");
      setIsBoolean(false);
    } else {
      setUnit("imperial");
      setSymbol("°F");
      setIsBoolean(true);
    }
  };

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  const urlByCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=60d505bb48f9c02e8d1f29a621cd125f&units=${unit}`;
  const urlByLatitudeLongitude = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=60d505bb48f9c02e8d1f29a621cd125f&units=${unit}`;

  useEffect(() => {
    const url = inputValue !== "" ? urlByCity : urlByLatitudeLongitude;
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data);
        setCityName(resp.data.name);
        setCountryName(resp.data.sys.country);
        setWeather(resp.data.weather[0]);
        setWind(resp.data.wind);
        setTemperature(resp.data.main);
      })
      .catch((error) => console.error(error))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 200)
      );
  }, [inputValue, unit]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={"weather " + color}>
            <div className="weather__header">
              <div>
                <p className="weather__header-city">
                  {cityName}, {countryName}
                </p>
                <p className="weather__header-date">{hoy}</p>
                <p className="weather__header-description">
                  {weather.description}
                </p>
              </div>
              <img
                className="weather__header-icon"
                // src={`../public/icons/${weather.icon}.png`}
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather"
              />
            </div>
            <div className="weather__main">
              <p className="weather__main-temperature">
                {Math.round(temperature.temp)}
                {symbol}
              </p>
              <div className="weather__main-details">
                <div className="weather__main-details-row">
                  <span className="weather__main-details-label">
                    <strong>
                      <u>Details</u>
                    </strong>
                  </span>
                </div>
                <div className="weather__main-details-row">
                  <span className="weather__main-details-label">
                    Feels like:{" "}
                  </span>
                  <span className="weather__main-details-value">
                    {Math.round(temperature.feels_like)}
                    {symbol}
                  </span>
                </div>
                <div className="weather__main-details-row">
                  <span className="weather__main-details-label">Wind: </span>
                  <span className="weather__main-details-value">
                    {wind.speed} m/s
                  </span>
                </div>
                <div className="weather__main-details-row">
                  <span className="weather__main-details-label">
                    Humidity:{" "}
                  </span>
                  <span className="weather__main-details-value">
                    {temperature.humidity}%
                  </span>
                </div>
                <div className="weather__main-details-row">
                  <span className="weather__main-details-label">
                    Pressure:{" "}
                  </span>
                  <span className="weather__main-details-value">
                    {temperature.pressure} hPa
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="weather__footer">
            <button
              className={"weather__footer-button " + backgroundColor}
              onClick={handleTemperatureScale}
            >
              Cambiar a F°
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default WeatherCard;
