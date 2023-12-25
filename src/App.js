
import './App.css';
import WeatherCard from "./components/WeatherCard"
import Location from "./components/Location"


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
  const { location, error } = Location()


  //get user location using useLocation hook
  // { lat, lng, loading, error  } = useLocation()

  //Make weatehr card component which accepts location as a prop

  // make a function to fetch background image and set it in a state. use img tag to render it
  return (
    <div>
      <WeatherCard location={location} error={error} />
    </div>
  );
}

export default App;
