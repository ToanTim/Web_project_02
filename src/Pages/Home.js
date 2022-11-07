import React from "react";
import "./Style/Home.css";
import DisplayTable from "../Components/DisplayTable/DisplayTable";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      data: [],
      valueInputCity: "",
      valueInputCountry: "",
      error: "",
      cityName: "",
      countryName: "",
      dataStatus: false,
      place: {},
      locateAllow: false,
      userLocationLatitude: "",
      userLocationLongitude: "",
      firstTime: false,
    };
    this.getLocation = this.getLocation.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
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

    /* const dataFetch = () => {
      try {
        fetch(
          "https://aerisweather1.p.rapidapi.com/forecasts/cairo,eg",
          options
        )
          .then((response) => response.text())
          .then((text) => (text.length ? JSON.parse(text) : {}))
          .then((data) => {
            this.setState({
              data: data,
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    dataFetch(); */
  }

  handleChangeCity(event) {
    this.setState({
      valueInputCity: event.target.value,
    });
  }

  handleChangeCountry(event) {
    this.setState({
      valueInputCountry: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      data: "",
      dataStatus: false,
      place: {},
      firstTime: true,
    });
    const options = {
      method: "GET",
      url: "https://aerisweather1.p.rapidapi.com/forecasts/cairo,eg",
      headers: {
        "X-RapidAPI-Key": "264e567887msha24859b1f418962p197fdfjsn46e485755706",
        "X-RapidAPI-Host": "aerisweather1.p.rapidapi.com",
      },
    };

    this.setState(
      {
        url:
          "https://aerisweather1.p.rapidapi.com/forecasts/" +
          this.state.valueInputCity +
          "," +
          this.state.valueInputCountry,
      },
      () => {
        console.log(this.state.url);
        fetch(this.state.url, options)
          .then((response) => response.text())
          .then((text) =>
            text.length ? JSON.parse(text) : console.log("not found")
          )
          .then((data) => {
            this.setState({
              data: data.response[0].periods,
              dataStatus: true,
              place: data.response[0].place,
            });
          })
          .catch((error) => {
            console.log(error.message);
            this.setState({
              dataStatus: false,
            });
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
                value={this.state.valueInputCity}
                onChange={this.handleChangeCity}
                placeholder="Enter city name"
              />
              <input
                type="text"
                className="formInput"
                value={this.state.valueInputCountry}
                onChange={this.handleChangeCountry}
                placeholder="Enter country name"
              />

              <input type="submit" value="Search" className="formButton" />
            </form>
          </div>
        </div>
        <div className="result_display">
          <div
            className={
              this.state.firstTime
                ? "otherLocationResult"
                : "removeOtherLocationResult"
            }
          >
            <DisplayTable
              data={this.state.data}
              dataStatus={this.state.dataStatus}
              place={this.state.place}
            />
          </div>
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
