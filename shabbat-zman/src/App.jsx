import { useState } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeatherApi from './hooks/useWeatherApi';
import ShabbatTimes from './components/ShabbatTimes';
import LocationSearch from './components/LocationSearch';
import HebrewDate from './components/HebrewDate';

function App() {
  const [manualLocation, setManualLocation] = useState('');
  const { location, error: locationError, loading: locationLoading } = useGeolocation();
  const { 
    weatherData, 
    error: weatherError, 
    loading: weatherLoading 
  } = useWeatherApi(
    manualLocation || location?.latitude,
    manualLocation ? null : location?.longitude
  );

  // Calculate upcoming Friday for display
  const today = new Date();
  const daysUntilFriday = (5 + 7 - today.getDay()) % 7;
  const upcomingFriday = new Date(today);
  upcomingFriday.setDate(today.getDate() + daysUntilFriday);
  const fridayLabel = upcomingFriday.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleLocationSubmit = (searchQuery) => {
    setManualLocation(searchQuery);
  };

  // Add debugging
  console.log('Weather Data:', weatherData?.forecast?.forecastday[0]?.astro);

  return (
    <div className="min-h-screen p-4 bg-gray-50">

      {/* Moved heading display here, so it appears above the LocationSearch */}
      {weatherData && (
        <h2 className="mb-4 text-xl font-semibold text-gray-800 text-center">
          Shabbat Times for {weatherData.location.name}
          {weatherData.location.region ? `, ${weatherData.location.region}` : ''} - {fridayLabel}
        </h2>
      )}

      <LocationSearch onLocationSubmit={handleLocationSubmit} />
      
      {(locationLoading || weatherLoading) && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      )}

      {locationError && !manualLocation && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-red-500">Location Error: {locationError}</p>
        </div>
      )}

      {weatherError && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-red-500">Weather Error: {weatherError}</p>
        </div>
      )}

      {weatherData && (
        <div className="max-w-lg mx-auto space-y-6">
          <HebrewDate />
          
          <ShabbatTimes 
            weatherData={weatherData} 
            locationName={weatherData.location.name}
            regionName={weatherData.location.region}
          />
        </div>
      )}
    </div>
  );
}

export default App;
