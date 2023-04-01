import "../styles/card.css";
import fields from "../data/fields";
import tempStyles from "../data/tempStyle";
export default function Card(props: any) {
  const { data, forecast } = props;

  function getWeatherIcon(code: string, smallSize: any = false) {
    if (smallSize) return `https://openweathermap.org/img/wn/${code}.png`;
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
  }

  const tempName = data.main.temp >= 15 ? "hot" : "cold";
  const tempStyle = tempStyles[tempName];

  function toOneDecimal(n: number) {
    return Math.round(n * 10) / 10;
  }

  function parseTime(s: string) {
    console.log(s);
    const time = s.split(" ")[1];
    const hours = parseInt(time.split(":")[0]);
    if (hours >= 12) {
      return hours === 12 ? `12PM` : `${hours % 12}PM`;
    } else {
      return hours === 0 ? `12AM` : `${hours}AM`;
    }
  }
  function check(forecast: any) {
    console.log(forecast);
  }

  return (
    <div
      className="weather-card"
      style={{
        backgroundColor: tempStyle.cardBackground,
        borderColor: tempStyle.borderColor,
        color: tempStyle.fontColor,
      }}
    >
      <div className="title">
        <h1 className="header">
          {data.name}, {data.sys.country}
        </h1>
        <p className="subheader">Zip Code: {data.zipCode}</p>
        <img
          src={getWeatherIcon(data.weather[0].icon)}
          alt={data.weather[0].description}
          className="weather-icon"
        ></img>
      </div>
      <div className="content">
        {fields.map((field: any) => {
          return (
            <div key={field.name} className="data-field">
              <p>{field.label}:</p>
              <p>
                {field.unit === "\u00b0C"
                  ? toOneDecimal(data.main[field.name])
                  : data.main[field.name]}
                {field.unit}
              </p>
            </div>
          );
        })}
      </div>
      <div className="forecast-row">
        {forecast.map((forecasttime: any, idx: any) => {
          return (
            <div className="forecast">
              <p>{`${toOneDecimal(forecasttime.main.temp)}\u00b0C`}</p>
              <p>{parseTime(forecasttime.dt_txt)}</p>
              <img
                src={getWeatherIcon(forecasttime.weather[0].icon, true)}
                alt={data.weather[0].description}
                className="forecast-weather-icon"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}
