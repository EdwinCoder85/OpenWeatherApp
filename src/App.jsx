import "./App.css";
import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [modeBackground, setModeBackground] = useState("background_light");
  const [modeButton, setModeButton] = useState("button_light");
  const [modeContent, setModeContent] = useState("content_light");
  const [modeSearch, setModeSearch] = useState("search_light");
  const [isBoolean, setIsBoolean] = useState(true);
  const [location, setLocation] = useState("");

  const handleChange = () => {
    setModeBackground(
      modeBackground === "background_light"
        ? "background_dark"
        : "background_light"
    );
    setModeButton(
      modeButton === "button_light" ? "button_dark" : "button_light"
    );
    setModeContent(
      modeContent === "content_light" ? "content_dark" : "content_light"
    );
    setModeSearch(
      modeSearch === "search_light" ? "search_dark" : "search_light"
    );
    setIsBoolean(isBoolean === true ? false : true);
  };

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLocation(e.target.value);
      e.target.value = "";
    }
  };

  document.body.className = modeBackground;

  return (
      <div className="app__container">
        <div className="app__header">
          <h1 className="app__title">Weather App</h1>
          <div className="app__search">
            <input
              className={modeSearch}
              onKeyUp={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
            <div className="app__search-btn">
              <i
                className="fa fa-search"
                style={{ color: isBoolean ? "#fcfcfc" : "#4d5b64" }}
              ></i>
            </div>
          </div>
          <div className="app__toogle">
            <label className="app__toogle-switch">
              <input type="checkbox" onChange={handleChange} />
              <span className="app__toogle-slider"></span>
            </label>
          </div>
        </div>
        <div className="app__content">
          <WeatherCard
            color={modeContent}
            backgroundColor={modeButton}
            inputValue={location}
          />
        </div>
      </div>
  );
}

export default App;
