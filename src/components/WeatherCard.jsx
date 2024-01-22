import React, { useState, useEffect } from "react"

function WeatherCard({ location, onWeatherChange }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeather()
    }
  }, [location])
  
  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&units=metric&lon=${location.longitude}&appid=${apiKey}`)
      const data = await response.json()
      setWeather(data)
      setLoading(false)
      onWeatherChange(data.weather[0].description)
    } catch (error) {
      setError("Error fetching weather data")
    }
  }


  const iconUrl = `http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`

  return (
    <div className="container">
      {loading ? (
        <p>Loading Weather...</p>
      ) : error ? (
        <p>Error fetching weather data: {error}</p>
      ) : (
        <div>
          {weather && weather.main && (
            <div>
              <div className="city">
                <p>{weather.name} </p>
                <img className="weather-icon" 
                src={iconUrl}
                alt={"Weather Icon"} style={{width: "100px"}}/>
              </div>
              <div className="weather">
                <p>Weather: {weather.weather[0].description}</p>
                <p>Temperature: {weather.main.temp} °C</p>
              </div>
              <div className="weather">
                <p>Humidity: {weather.main.humidity} %</p>
                <p>Feels Like: {weather.main.feels_like} °C</p>
              </div>
              <div className="weather">
                <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          )}
        </div>
      )} 
    </div>
  );
}

export default WeatherCard;
