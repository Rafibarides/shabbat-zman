import { useState } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeatherApi from './hooks/useWeatherApi';
import ShabbatTimes from './components/ShabbatTimes';
import LocationSearch from './components/LocationSearch';
import HebrewDate from './components/HebrewDate';
import Support from './components/Support';
import Privacy from './components/Privacy';
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

  const today = new Date();
  const dayOfWeek = today.getDay();
  let daysUntilFriday;
  
  if (dayOfWeek === 5) {
    daysUntilFriday = 0; 
  } else if (dayOfWeek === 6) {
    daysUntilFriday = -1;
  } else {
    daysUntilFriday = (5 + 7 - dayOfWeek) % 7; 
  }

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

  const isSupport = window.location.pathname === '/support';
  const isPrivacy = window.location.pathname === '/privacy';

  return (
    <div style={{
      fontFamily: 'Urbanist',
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #2a0934 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      position: 'relative'
    }}>
      {isSupport ? (
        <Support />
      ) : isPrivacy ? (
        <Privacy />
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            maxWidth: 'min(600px, 96vw)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'calc(1.5vw + 8px)',
            paddingBottom: 'calc(4vw + 30px)',
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
      )}

      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '0',
        right: '0',
        textAlign: 'center',
        padding: '10px'
      }}>
        <a
          href="/privacy"
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 'calc(0.3vw + 0.4rem)',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

export default App;
