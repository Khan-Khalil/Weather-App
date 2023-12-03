import React, { useState, useEffect } from "react";


function UserLocation() {
    const [location, setLocation] = useState({ latitude: "", longitude: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            (Error) => {
                // If there is an error or user denies permission, fetch location using IP
                fetchByIP();
              }
        )
    } else {
        fetchByIP()
    } 
   

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
        </div>
      )}
    </div>
  );
}

export default UserLocation;
