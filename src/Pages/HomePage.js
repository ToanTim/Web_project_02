import React, { useState, useEffect } from "react";
import "./Style/Home.css";
const HomePage = () => {
  const [locateAllow, setLocateAllow] = useState(false);
  const [userLocationLatitude, setUserLocationLatitude] = useState(false);
  const [userLocationLongitude, setUserLocationLongitude] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [city, setCity] = useState([]);
  const [url, setUrl] = useState("");
  const getLocation = (position) => {
    setLocateAllow(true);
    setUserLocationLatitude(position.coords.latitude);
    setUserLocationLongitude(position.coords.longitude);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getLocation(position);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
        this.setState({
          locateAllow: false,
        });
      }
    );
  }, []);

  const handleChange = (event) => {
    const string = event.target.value.replace(/ /g, "%20");
    setUserInput(string);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cityArray = [];
    setUrl(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=PRVRZSMiOwFiRxQikyjEvnCw3uFit564&q=` +
        userInput
    );

    console.log(url);
    fetch(url)
      .then((response) => response.text())
      .then((text) => (text.length ? JSON.parse(text) : {}))
      .then((data) => {
        data.map((city) => {
          cityArray.push(city.Key);
        });
      })
      .then(
        console.log(cityArray),
        setCity({ city: cityArray }, () => {})
      )

      .catch((error) => {
        throw error;
      });
  };
  return (
    <div className="container">
      <div className="search_bar_button">
        <div className="formContainer">
          <form onSubmit={handleSubmit} className="formSearch">
            <input
              type="text"
              className="formInput"
              value={userInput}
              onChange={handleChange}
              placeholder="Enter city name"
            />

            <input type="submit" value="Search" className="formButton" />
          </form>
        </div>
      </div>
      <div className="result_display">
        <div
          className={
            locateAllow ? "userLocationResult" : "removeUserLocationResult"
          }
        >
          <p>{city[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
