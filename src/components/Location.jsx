import React, { useState, useEffect } from  "react";

function useLocation() {
    const [location, setLocation] = useState({ latitude: "", longitude: "" })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                    setLoading(false)
                },
                (error) => {
                    fetchByIP()
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
            })
            setLoading(false)
        })
        .catch((error) => {
            setError("Error fetching geolocation data");
            setLoading(false)
        });
    }
    return { location, error, loading }
}

export default useLocation;