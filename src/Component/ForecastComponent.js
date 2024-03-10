import React, { useState, useEffect } from 'react';
import axios from 'axios';



function ForecastComponent({ location, apiKey }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {

    //load the data of current user location
    const fetchForecastData = async () => {
      setLoading(true);
      try {
        const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(location)}&apikey=${apiKey}`;
        console.log('API URL:', apiUrl); // Log the API URL before making the request
        const response = await axios.get(apiUrl);
        setForecastData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    };
    fetchForecastData();
  }, [location, apiKey]);




  return (
    <div className="forecast-container">

      <h2>Weather Forecast</h2>

      {loading ? (<p>Loading forecast data...</p>) : error ? (<p>Error: {error}</p>) : forecastData ? (
        <div>
          <p>Location: {forecastData.location.name}</p>
          <p>Latitude: {forecastData.location.latitude}</p>
          <p>Longitude: {forecastData.location.longitude}</p>
          <p>Timezone: {forecastData.timezone}</p>
          <p>Forecast Summary: {forecastData.forecast.summary}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ForecastComponent;
