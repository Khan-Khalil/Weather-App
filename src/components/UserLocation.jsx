import React, { useState, useEffect } from "react";


function UserLocation() {
    const [location, setLocation] = useState({ latitude: "", longitude: "" })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState(null)
    const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLoading(false)
            },
            (error) => {
                // If there is an error or user denies permission, fetch location using IP
                fetchByIP();
              }
        )
    } else {
        fetchByIP()
    } 
   console.log(location)
    fetchWeather()
    console.log(weather)
  }, [])


    const fetchByIP = () => {
        fetch("https://geolocation-db.com/json/")
        .then((response) => response.json())
        .then((data) => {
            setLocation({
            latitude: data.latitude,
            longitude: data.longitude,
            });
            setLoading(false);
        })
        .catch((error) => {
            setError("Error fetching geolocation data");
            console.error("Error fetching geolocation data:", error);
            setLoading(false);
        });
    }

    const fetchWeather = () => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
            setWeather(data)
            console.log(data)
                }) .catch((error) => {
                setError("Error fetching weather data")
                })
    }

    

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>Your latitude is: {location.latitude}</p>
          <p>Your longitude is: {location.longitude}</p>
          {weather && (
            <div>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Temperature: {weather.main.temp} °C</p>
              {/* Add more weather details as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserLocation;
