import './App.css';
import { useState } from "react";
import Search from "./components/search/Search";
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WRATHER_API_KEY } from './api'; 


function App() {

  const [currentWeather, setCurrentWeather] = useState(null) 

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");


    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WRATHER_API_KEY}&units=metric`);

 


    Promise.all([currentWeatherFetch, ])
      .then(async (response) => {
        const weatherResponse = await response[0].json(); 

        setCurrentWeather({ city: searchData.label, ...weatherResponse }); 
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);


  return (
    <div className="container">
      <h1>Weather App</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />} 
    </div>
  );
}

export default App;
