import React, { useEffect, useState } from "react";
import "./Style/DisplayTable.css";
const DisplayTable = (props) => {
  const [weatherText, setWeatherText] = useState("");
  const [temperature, setTemperature] = useState("");
  const [temperatureMax, setTemperatureMax] = useState("");
  const [weatherText1, setWeatherText1] = useState("");
  const url =
    "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" +
    props.cityArray +
    "?apikey=PRVRZSMiOwFiRxQikyjEvnCw3uFit564";
  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => (text.length ? JSON.parse(text) : {}))
      .then((data) => {
        console.log(data.DailyForecasts[0].Temperature.Minimum.Value);
        setTemperature(data.DailyForecasts[0].Temperature.Minimum.Value + "F");
        setTemperatureMax(
          data.DailyForecasts[0].Temperature.Maximum.Value + "F"
        );
      });
  }, []);
  return (
    <div>
      <h1>{props.cityLocate}</h1>
      <p>Minimum Temperature: {temperature}</p>
      <p>Maximum Temperature: {temperatureMax}</p>
    </div>
  );
};

export default DisplayTable;
