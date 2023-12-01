import React, { useState } from "react";


function UserLocation() {

    const [location, setLocaton] = useState(null)

    const handleLocationClick = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    
                    setLocaton({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                (error) => {
                    console.error("Error getting location:", error.message);
                }
            )
        } else {
            console.error("Geolocation is not supported by your browser")
        }
    }
    


    return (
        <div>
      <h2>User Location</h2>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <button onClick={handleLocationClick}>Get Location</button>
      )}
    </div>
    )
}

export default UserLocation;
