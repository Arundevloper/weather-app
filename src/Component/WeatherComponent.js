import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios for making HTTP requests
import ForecastComponent from './ForecastComponent'; // Importing ForecastComponent for displaying forecast
import '../App.css';

function WeatherComponent() {
    // State variables for storing weather data, location input, loading status, and error
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_KEY = 'pwx7fvl5geEoZhNHJHis3qYZ19vJoIOp';
    
    // Function to fetch weather data from the API based on latitude and longitude
    const fetchWeatherData = async (latitude, longitude) => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature,temperatureApparent,precipitationProbability,humidity&apikey=${API_KEY}`);
        setWeatherData(response.data.data.timelines[0].intervals[0]); // Set weather data from the response
      } catch (error) {
        if (error.response && error.response.status >= 400) {
          setError('Too many API calls'); // Set error message for HTTP error responses
        } else {
          setError(error.message); // Set error message for other errors
        }
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };


  
    // Function to handle search button click event
    const handleSearch = () => {
      if (location.trim() !== '') {
        fetchWeatherData(); // Fetch weather data if location input is not empty
      }
    };
  


    // Function to handle allowing location access
    const handleAllowLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude); // Fetch weather data using user's current location
        },
        (error) => {
          console.error('Error getting user location:', error); // Log error if user location cannot be accessed
        }
      );
    };

  
    // useEffect hook to run once after the initial render
    useEffect(() => {
      // Fetch weather data based on user's location
      handleAllowLocation();
    }, []);


  
    // API key for forecast component
    const API_KEY2='2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU';
  
    return (
      <div className="weather-container">
        <h2>Real-Time Weather</h2>
        
        {/* Input field for location search */}
        <div className="weather-input">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>


        
        {/* Display loading message, error message, or weather information */}
        {loading ? (
          <p>Loading weather data...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : weatherData ? (
          <div className="weather-info">
            <p>Temperature: {weatherData.values.temperature}°C</p>
            <p>Feels Like: {weatherData.values.temperatureApparent}°C</p>
            <p>Precipitation Probability: {weatherData.values.precipitationProbability}%</p>
            <p>Humidity: {weatherData.values.humidity}%</p>
          </div>
        ) : null}

        

        {/* Render ForecastComponent with location and API key */}
        <ForecastComponent location={location} apiKey={API_KEY2} />
        
        {/* Button to allow access to user's GPS location */}
        <button onClick={handleAllowLocation}>Please open your GPS location</button>
      </div>
    );
}

export default WeatherComponent;
