
import './App.css';
import WeatherCard from "./components/WeatherCard"
import useLocation from "./components/Location"
import { useEffect, useState } from 'react';
import BackgroundImage from "./components/BackgroundImage"


function App() {
  const { location, error, loading } = useLocation()
  const [image, setImage] = useState(null)
  const [weatherDescription, setWeatherDescription] = useState(null)


  useEffect(()=> {
    const fetchBackgroundImage = async () => {
      try {
        const imageUrl = await BackgroundImage(weatherDescription)
        setImage(imageUrl)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBackgroundImage()
  },[weatherDescription])

  return (
    <div className= "background" style={{ backgroundImage: image }}>
      {loading ? (
        <p>Loading location...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <WeatherCard location={location} onWeatherChange={setWeatherDescription}/>
      )}
    </div>
  );
}

export default App;
