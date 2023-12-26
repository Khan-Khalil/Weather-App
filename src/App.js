
import './App.css';
import WeatherCard from "./components/WeatherCard"
import useLocation from "./components/Location"


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
    })
    .catch(err => {
      // Use a default background image
      document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
      )`
    })

function App() {
  const { location, error, loading } = useLocation()


  return (
    <div>
      {loading ? (
        <p>Loading location...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <WeatherCard location={location} />
      )}
    </div>
  );
}

export default App;
