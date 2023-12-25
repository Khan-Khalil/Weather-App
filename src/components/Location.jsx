import React, { useState, useEffect } from  "react";

function Location() {
    const [location, setLocation] = useState({ latitude: "", longitude: "" })
    const [error, setError] = useState(null)


    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    fetchByIP();
                  }
            )
        } else {
            fetchByIP()
    
        } 
       console.log(location)
    }, [])
    
     
    
    const fetchByIP = () => {
        fetch("https://geolocation-db.com/json/")
        .then((response) => response.json())
        .then((data) => {
            setLocation({
            latitude: data.latitude,
            longitude: data.longitude,
            });
        })
        .catch((error) => {
            setError("Error fetching geolocation data");
            console.error("Error fetching geolocation data:", error);
        });
    }

    return { location, error };
    console.log(location)
}

export default Location;