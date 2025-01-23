import { useState } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeatherApi from './hooks/useWeatherApi';
import ShabbatTimes from './components/ShabbatTimes';
import LocationSearch from './components/LocationSearch';

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

  const handleLocationSubmit = (searchQuery) => {
    setManualLocation(searchQuery);
  };

  // Add debugging
  console.log('Weather Data:', weatherData?.forecast?.forecastday[0]?.astro);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
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
