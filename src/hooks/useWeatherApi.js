import { useState, useEffect } from 'react';
import fetchData from '../utils/fetchData';

const API_KEY = 'a693943efa754abb860163744241803';
const BASE_URL = 'http://api.weatherapi.com/v1';

const useWeatherApi = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!latitude) return;

      // If longitude is null, treat latitude as a location string
      const query = longitude ? `${latitude},${longitude}` : latitude;
      const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no`;
      
      const [data, error] = await fetchData(url);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setWeatherData(data);
      setLoading(false);
    };

    setLoading(true);
    setError(null);
    fetchWeatherData();
  }, [latitude, longitude]);

  return { weatherData, loading, error };
};

export default useWeatherApi; 