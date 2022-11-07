import React, { useEffect, useState } from "react";
import "./Style/DisplayTable.css";
const DisplayTable = (props) => {
  console.log(props.data);
  console.log(props.place);
  return (
    <div>
      {props.dataStatus ? (
        <div className="weatherResultContainer">
          <div className="weatherResultDiv">
            <p>
              {props.place.name},{props.place.country}
            </p>
            <p>Data: {props.data[0].dateTimeISO.slice(0, 10)}</p>
            <h1>{props.data[0].avgTempC}°C</h1>
            <p>{props.data[0].weather}</p>
          </div>
          <div className="weatherResultDiv">
            <p>
              {props.place.name},{props.place.country}
            </p>
            <p>Data: {props.data[1].dateTimeISO.slice(0, 10)}</p>
            <h1>{props.data[1].avgTempC}°C</h1>
            <p>{props.data[1].weather}</p>
          </div>
          <div className="weatherResultDiv">
            <p>
              {props.place.name},{props.place.country}
            </p>
            <p>Data: {props.data[2].dateTimeISO.slice(0, 10)}</p>
            <h1>{props.data[2].avgTempC}°C</h1>
            <p>{props.data[2].weather}</p>
          </div>
          <div className="weatherResultDiv">
            <p>
              {props.place.name},{props.place.country}
            </p>
            <p>Data: {props.data[3].dateTimeISO.slice(0, 10)}</p>
            <h1>{props.data[3].avgTempC}°C</h1>
            <p>{props.data[3].weather}</p>
          </div>
          <div className="weatherResultDiv">
            <p>
              {props.place.name},{props.place.country}
            </p>
            <p>Data: {props.data[4].dateTimeISO.slice(0, 10)}</p>
            <h1>{props.data[4].avgTempC}°C</h1>
            <p>{props.data[4].weather}</p>
          </div>
          <div className="weatherResultDiv">
            <p>
              {props.place.name},{props.place.country}
            </p>
            <p>Data: {props.data[5].dateTimeISO.slice(0, 10)}</p>
            <h1>{props.data[5].avgTempC}°C</h1>
            <p>{props.data[5].weather}</p>
          </div>
          <div className="weatherResultDiv">
            <p>
              {props.place.name},{props.place.country}
            </p>
            <p>Data: {props.data[6].dateTimeISO.slice(0, 10)}</p>
            <h1>{props.data[6].avgTempC}°C</h1>
            <p>{props.data[6].weather}</p>
          </div>
        </div>
      ) : (
        <div>City or country not correct</div>
      )}
    </div>
  );
};

export default DisplayTable;
