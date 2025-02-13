import PropTypes from 'prop-types';
import { convertToAmPm } from '../utils/timeConverters';
import { motion } from 'framer-motion';

const ShabbatTimes = ({ weatherData }) => {
  if (!weatherData || !weatherData.forecast) return null;

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
  
  // Saturday will be the day after that "Friday" date
  const nextDay = new Date(upcomingFriday.getTime() + 24 * 60 * 60 * 1000);

  const formatToYyyyMmDd = (dateObj) =>
    dateObj.toLocaleDateString('en-CA');

  const fridayString = formatToYyyyMmDd(upcomingFriday);
  const saturdayString = formatToYyyyMmDd(nextDay);

  const fridayForecast = weatherData.forecast.forecastday.find(
    (day) => day.date === fridayString
  );
  const saturdayForecast = weatherData.forecast.forecastday.find(
    (day) => day.date === saturdayString
  );

  if (!fridayForecast || !saturdayForecast) {
    return (
      <div>
        <p>Unable to fetch times for upcoming Shabbat. Please check back later.</p>
      </div>
    );
  }

  const calculateAdjustedTime = (timeStr, offsetMinutes) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    const dateObj = new Date();
    dateObj.setHours(period === 'PM' ? hours + 12 : hours);
    dateObj.setMinutes(minutes + offsetMinutes);
    
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const sunset = fridayForecast.astro.sunset;
  const shabbatStart = calculateAdjustedTime(sunset, -18);
  const netzHachama = saturdayForecast.astro.sunrise;
  const saturdaySunset = saturdayForecast.astro.sunset;
  const shabbatEnd = calculateAdjustedTime(saturdaySunset, 40);
  const rabeinuTam = calculateAdjustedTime(saturdaySunset, 72);

  const pillStyle = {
    background: 'rgba(111, 0, 127, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 'calc(2vw + 16px)',
    padding: 'calc(0.8vw + 6px) calc(1vw + 10px)',
    margin: 'calc(0.2vw + 1px) 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 'min(300px, 80vw)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    color: '#FFE1FF',
    fontSize: window.matchMedia('(orientation: portrait)').matches 
      ? 'calc(1vw + 1rem)'
      : 'calc(0.6vw + 0.6rem)',
    fontWeight: '500',
  };

  const timeStyle = {
    color: '#ffffff',
    fontSize: window.matchMedia('(orientation: portrait)').matches 
      ? 'calc(1vw + 0.9rem)'
      : 'calc(0.6vw + 0.6rem)',
    fontWeight: '600',
  };

  const iconStyle = {
    width: 'calc(1vw + 16px)',
    height: 'calc(1vw + 16px)',
    marginRight: 'calc(0.5vw + 4px)',
    objectFit: 'contain'
  };

  const timeRowStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'calc(0.5vw + 4px)',
        width: '100%',
        padding: 'calc(1vw + 8px) 0'
      }}>
      {[
        { icon: "candles.avif", label: "Candle Lighting", time: shabbatStart },
        { icon: "siddur.avif", label: "Netz HaChama", time: convertToAmPm(netzHachama) },
        { icon: "wine.avif", label: "Shabbat Ends", time: shabbatEnd },
        { icon: "clove.avif", label: "Rabeinu Tam", time: rabeinuTam }
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: {
              duration: 0.4
            }
          }}
          transition={{
            duration: 0.4,
            delay: 0.4 + index * 0.1,
            ease: 'easeOut'
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.12)',
            transition: {
              type: "tween",
              duration: 0.3,
              ease: [0.33, 1, 0.68, 1]
            }
          }}
          whileTap={{
            scale: window.matchMedia('(orientation: portrait)').matches ? 1.05 : 0.98,
            boxShadow: window.matchMedia('(orientation: portrait)').matches 
              ? '0 0 40px rgba(255, 255, 255, 0.2)'
              : '0 0 20px rgba(255, 255, 255, 0.08)',
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 15
            }
          }}
          style={{
            ...pillStyle,
            transition: 'box-shadow 0.3s ease-in-out',
            cursor: 'pointer'
          }}
        >
          <span style={timeRowStyle}>
            <img
              src={`${import.meta.env.BASE_URL}assets/images/${item.icon}`}
              alt=""
              style={iconStyle}
            />
            <span style={labelStyle}>{item.label}</span>
          </span>
          <span style={timeStyle}>{item.time}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

ShabbatTimes.propTypes = {
  weatherData: PropTypes.shape({
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        astro: PropTypes.shape({
          sunrise: PropTypes.string.isRequired,
          sunset: PropTypes.string.isRequired
        }).isRequired
      })).isRequired
    }).isRequired
  }).isRequired,
  locationName: PropTypes.string.isRequired,
  regionName: PropTypes.string
};

export default ShabbatTimes;
