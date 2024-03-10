import React, { useState, useEffect } from 'react';
import ForecastComponent from './ForecastComponent';
import axios from 'axios';//importing axios module for fetching api
import '../App.css';


//useStates
function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = 'pwx7fvl5geEoZhNHJHis3qYZ19vJoIOp';



  //function to get the data response data from api call
  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${encodeURIComponent(location)}&fields=temperature,weatherCode,humidity,windSpeed,precipitationProbability&apikey=${API_KEY}`);
      setWeatherData(response.data.data.timelines[0].intervals[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  //Function to handel when User click on  search Button
  const handleSearch = () => {
    if (location.trim() !== '') {
      fetchWeatherData();
    }
  };



  useEffect(() => {
    // Fetch weather data based on user's location
    // Run once after the initial render
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature,weatherCode,humidity,windSpeed,precipitationProbability&apikey=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data.data.timelines[0].intervals[0]);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    });
  }, []);



  return (
    <div className="weather-container">
      <h2>Real-Time Weather</h2>

      <div className="weather-search">
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location..." />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (<p>Loading weather data...</p>) : error ? (<p className="error-message">Error: {error}</p>) : weatherData ? (
        <div>
        <div className="weather-info">
          <p>Current Locaion </p>
          <p>Temperature: {weatherData.values.temperature}°C</p>
          <p>Humidity: {weatherData.values.humidity}%</p>
          <p>Wind Speed: {weatherData.values.windSpeed} m/s</p>
          <p>Precipitation Probability: {weatherData.values.precipitationProbability}%</p>
        </div>
        <ForecastComponent location={location} apiKey={API_KEY} />
        </div>
      ) : null}
    </div>
  );
}

export default WeatherComponent;
