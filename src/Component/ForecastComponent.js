import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ForecastComponent({ location, apiKey }) {
  // State variables for storing forecast data, loading status, and error
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch forecast data from the API
    const fetchForecastData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        // Fetch forecast data from the Tomorrow.io API
        const response = await axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(location)}&apikey=${apiKey}`);
        setForecastData(response.data); // Set forecast data from the response
      } catch (error) {
        // Handle errors during API request
        if (error.response && error.response.status >= 400) {
          setError('Too many API calls'); // Set error message for HTTP error responses
        } else {
          setError(error.message); // Set error message for other errors
        }
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };



    fetchForecastData(); // Call fetchForecastData when location or apiKey changes
  }, [location, apiKey]); // Depend on location and apiKey changes



  return (
    <div>
      <h2>Forecasted Weather</h2>
      {/* Display loading message, error message, or forecast data */}
      {loading ? (
        <p>Loading forecast data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : forecastData ? (
        <div>
          <p>Temperature: {forecastData.data.temperature}°C</p>
          <p>Description: {forecastData.data.weatherCode}</p>
        </div>
      ) : null}
    </div>
  );
}


export default ForecastComponent;
