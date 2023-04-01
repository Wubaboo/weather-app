import React, { useState } from "react";
import InputField from "./components/inputField";
import Card from "./components/card";
import "./App.css";
import tempStyles from "./data/tempStyle";

function App() {
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [tempVal, setTempVal] = useState("none");
  const [forecast, setForecast] = useState([]);
  const getTemperature = () => {
    setError(false);
    setData(null);

    fetch(`http://127.0.0.1:8000/weather?zipcode=${zipCode}`)
      .then((res) => res.json())
      .then((data) => {
        data.zipCode = zipCode;
        setData(data);
        setZipCode("");
        setTempVal(data.main.temp < 15 ? "cold" : "hot");
      })
      .catch((e) => {
        setError(true);
        setData(null);
        setZipCode("");
        setTempVal("none");
      });
    fetch(`http://127.0.0.1:8000/forecast?zipcode=${zipCode}`)
      .then((res) => res.json())
      .then((data) => {
        setForecast(data.list.slice(0, 8));
      });
  };
  return (
    <div
      className="App"
      style={{ backgroundColor: tempStyles[tempVal].screenBackground }}
    >
      <div className="page-title">
        <h1 className="title">Check the Weather!</h1>
        <InputField
          title="Check the Weather!"
          zipCode={zipCode}
          setZipCode={setZipCode}
          getTemperature={getTemperature}
          error={error}
        ></InputField>
      </div>
      {data ? <Card data={data} forecast={forecast}></Card> : null}
    </div>
  );
}

export default App;
