import { useState, useEffect } from 'react';
import fetchData from '../utils/fetchData';

const API_KEY = 'a693943efa754abb860163744241803';
const BASE_URL = 'https://api.weatherapi.com/v1';

const useWeatherApi = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This matches the Friday/Saturday logic from ShabbatTimes
  const getThisWeeksShabbatDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Sunday, 5=Friday, 6=Saturday
    let daysUntilFriday;

    if (dayOfWeek === 5) {
      // It's Friday. Show today as Friday
      daysUntilFriday = 0;
    } else if (dayOfWeek === 6) {
      // It's Saturday. Show "yesterday" as Friday
      daysUntilFriday = -1;
    } else {
      // Sunday through Thursday => next Friday
      daysUntilFriday = (5 + 7 - dayOfWeek) % 7;
    }

    const upcomingFriday = new Date(today);
    upcomingFriday.setDate(today.getDate() + daysUntilFriday);

    // The corresponding Saturday is the day after
    const nextDay = new Date(upcomingFriday.getTime() + 24 * 60 * 60 * 1000);

    const formatToYyyyMmDd = (date) => date.toLocaleDateString('en-CA');

    return {
      fridayString: formatToYyyyMmDd(upcomingFriday),
      saturdayString: formatToYyyyMmDd(nextDay),
    };
  };

  useEffect(() => {
    if (!latitude) return;

    // Helper function to fetch astronomy data for a specific date
    const fetchAstronomyData = async (query, dateString) => {
      const url = `${BASE_URL}/astronomy.json?key=${API_KEY}&q=${query}&dt=${dateString}`;
      const [astroRes, astroErr] = await fetchData(url);
      if (astroErr || !astroRes?.astronomy?.astro) {
        console.error(`Error fetching astronomy data for ${dateString}`, astroErr);
        return null;
      }
      return {
        date: dateString,
        astro: astroRes.astronomy.astro,
      };
    };

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      // If longitude is null, treat latitude as location string
      const query = longitude ? `${latitude},${longitude}` : latitude;

      // Fetch standard 3-day forecast
      const forecastUrl = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=no`;
      const [forecastRes, forecastErr] = await fetchData(forecastUrl);

      if (forecastErr) {
        setError(forecastErr.message);
        setLoading(false);
        return;
      }

      // Start with whatever came back in the 3-day forecast
      let combinedForecastDays = forecastRes?.forecast?.forecastday || [];

      // Now figure out the correct Friday and Saturday to fetch (like ShabbatTimes)
      const { fridayString, saturdayString } = getThisWeeksShabbatDates();
      const datesToFetch = [fridayString, saturdayString];

      // If either date is missing, fetch Astronomy for it
      for (const dateStr of datesToFetch) {
        const existing = combinedForecastDays.find((fd) => fd.date === dateStr);
        if (!existing) {
          const astroData = await fetchAstronomyData(query, dateStr);
          if (astroData) {
            combinedForecastDays.push(astroData);
          }
        }
      }

      // Sort them so forecastday is still in date order
      combinedForecastDays.sort((a, b) => (a.date > b.date ? 1 : -1));

      const newWeatherData = {
        ...forecastRes,
        forecast: {
          forecastday: combinedForecastDays,
        },
      };

      setWeatherData(newWeatherData);
      setLoading(false);
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return { weatherData, loading, error };
};

export default useWeatherApi; 