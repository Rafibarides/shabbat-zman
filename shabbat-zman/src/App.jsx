import { useState } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeatherApi from './hooks/useWeatherApi';
import ShabbatTimes from './components/ShabbatTimes';
import LocationSearch from './components/LocationSearch';
import HebrewDate from './components/HebrewDate';
import { motion } from 'framer-motion';

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
    <div style={{
      fontFamily: 'Urbanist',
      minHeight: '100vh',
      background: `linear-gradient(135deg, #0a0a0a 0%, #2a0934 100%)`,
      color: '#ffffff',
      padding: 'calc(2vw + 8px) calc(1vw + 8px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          maxWidth: 'min(600px, 90vw)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'calc(1.5vw + 8px)'
        }}>
        {weatherData && (
          <h2 style={{
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 'calc(0.8vw + 0.7rem)',
            lineHeight: '1.5',
            margin: 0
          }}>
            <div>Shabbat Times for {weatherData.location.name}
            {weatherData.location.region ? `, ${weatherData.location.region}` : ''}</div>
            <div style={{
              fontSize: 'calc(0.6vw + 0.6rem)',
              color: '#FFE1FF',
              marginTop: 'calc(0.3vw + 0.15rem)'
            }}>
              {fridayLabel}
            </div>
          </h2>
        )}

        <LocationSearch onLocationSubmit={handleLocationSubmit} />
        
        {weatherData && (
          <>
            <HebrewDate />
            <ShabbatTimes 
              weatherData={weatherData} 
              locationName={weatherData.location.name}
              regionName={weatherData.location.region}
            />
          </>
        )}

        {(locationLoading || weatherLoading) && (
          <div style={{
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <p>Loading...</p>
          </div>
        )}

        {locationError && !manualLocation && (
          <div style={{
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <p>Location Error: {locationError}</p>
          </div>
        )}

        {weatherError && (
          <div style={{
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <p>Weather Error: {weatherError}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
