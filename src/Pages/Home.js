import React from "react";
import "./Style/Home.css";
import DisplayTable from "../Components/DisplayTable/DisplayTable";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlSample:
        "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=PRVRZSMiOwFiRxQikyjEvnCw3uFit564&q=tampere",
      url: "",
      cityKey: "",
      data: [],
      valueInput: "",
      error: "",
      city1: 0,
      city2: 0,
      cityLocate1: "",
      cityLocate2: "",
      cityState: 0,
      locateAllow: false,
      userLocationLatitude: "",
      userLocationLongitude: "",
    };
    this.getLocation = this.getLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLocation(position) {
    this.setState({
      locateAllow: true,
      userLocationLatitude: position.coords.latitude,
      userLocationLongitude: position.coords.longitude,
    });
  }

  componentDidMount() {
    const cityArray = [];
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getLocation(position);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
        this.setState({
          locateAllow: false,
        });
      }
    );

    fetch(this.state.urlSample)
      .then((response) => response.text())
      .then((text) => (text.length ? JSON.parse(text) : {}))
      .then((data) => {
        data.map((city) => {
          cityArray.push(city.Key);
        });
      })
      .then(
        console.log(cityArray),
        this.setState({ city: cityArray }, () => {
          console.log(this.state.city);
        })
      );
  }

  handleChange(event) {
    const string = event.target.value.replace(/ /g, "%20");
    this.setState({
      valueInput: string,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        url:
          `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=PRVRZSMiOwFiRxQikyjEvnCw3uFit564&q=` +
          this.state.valueInput,
        city1: 0,
        city2: 0,
      },
      () => {
        console.log(this.state.url);
        fetch(this.state.url)
          .then((response) => response.text())
          .then((text) => (text.length ? JSON.parse(text) : null))
          .then((data) => {
            this.setState({
              city1: data[0].Key,
              city2: data[1].Key,
              cityLocate1: data[0].EnglishName + "," + data[0].Country.ID,
              cityLocate2: data[1].EnglishName + "," + data[1].Country.ID,
            });
          })
          .then(console.log(this.state.city1, this.state.city2))
          .catch((error) => {
            throw error;
          });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className="search_bar_button">
          <div className="formContainer">
            <form onSubmit={this.handleSubmit} className="formSearch">
              <input
                type="text"
                className="formInput"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Enter city name"
              />

              <input type="submit" value="Search" className="formButton" />
            </form>
          </div>
        </div>
        <div className="result_display">
          {this.state.city1 == 0 ? (
            <p color="red">City not found</p>
          ) : (
            <div className="otherLocationResult">
              <DisplayTable
                cityArray={this.state.city1}
                cityLocate={this.state.cityLocate1}
              />
            </div>
          )}

          {this.state.city2 == 0 ? (
            <p></p>
          ) : (
            <div className="otherLocationResult">
              <DisplayTable
                cityArray={this.state.city2}
                cityLocate={this.state.cityLocate2}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
/*
<DisplayTable cityArray={this.state.city[0]} /> 
<div className="otherLocationResult">
            <DisplayTable cityArray={this.state.city} />
          </div> */

/*   {this.state.city.map((item) => {
            <div className="otherLocationResult">
              <DisplayTable cityArray={item} />
            </div>;
          })} */
export default Home;
