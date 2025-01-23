import PropTypes from 'prop-types';
import { convertToAmPm } from '../utils/timeConverters';

const ShabbatTimes = ({ weatherData }) => {
  // Console log the current date/time
  const now = new Date();
  console.log('Current local date/time:', now.toString());

  if (!weatherData || !weatherData.forecast) return null;

  console.log('Forecast days from API:');
  weatherData.forecast.forecastday.forEach(day => {
    console.log(`Day in forecast: ${day.date} =>`, new Date(day.date).toString());
  });

  // Find the upcoming Friday
  const today = new Date();
  const daysUntilFriday = (5 + 7 - today.getDay()) % 7;
  const upcomingFriday = new Date(today);
  console.log('Today is:', today.toString());
  console.log('Days until Friday:', daysUntilFriday);
  upcomingFriday.setDate(today.getDate() + daysUntilFriday);
  console.log('Upcoming Friday is:', upcomingFriday.toString());

  // Compare date strings in "YYYY-MM-DD" format, ignoring time zones
  const formatToYyyyMmDd = (dateObj) =>
    dateObj.toLocaleDateString('en-CA'); // e.g. "2025-01-24"

  const fridayString = formatToYyyyMmDd(upcomingFriday);

  // Create "Saturday" by adding 1 day to upcomingFriday
  const nextDay = new Date(upcomingFriday.getTime() + 24 * 60 * 60 * 1000);
  const saturdayString = formatToYyyyMmDd(nextDay);

  // Find the forecast day that matches our Friday (by string comparison)
  const fridayForecast = weatherData.forecast.forecastday.find(
    (day) => day.date === fridayString
  );

  // Find the forecast day for Saturday
  const saturdayForecast = weatherData.forecast.forecastday.find(
    (day) => day.date === saturdayString
  );

  if (!fridayForecast || !saturdayForecast) {
    return (
      <div className="p-4 bg-yellow-100 rounded-lg">
        <p>Unable to fetch times for upcoming Shabbat. Please check back later.</p>
      </div>
    );
  }

  // Calculate Shabbat times with actual offsets
  const calculateAdjustedTime = (timeStr, offsetMinutes) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    // Convert to Date object for easier manipulation
    const dateObj = new Date();
    dateObj.setHours(period === 'PM' ? hours + 12 : hours);
    dateObj.setMinutes(minutes + offsetMinutes);
    
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate all times
  const sunset = fridayForecast.astro.sunset;
  const shabbatStart = calculateAdjustedTime(sunset, -18); // 18 minutes before sunset
  const netzHachama = saturdayForecast.astro.sunrise;
  const saturdaySunset = saturdayForecast.astro.sunset;
  const shabbatEnd = calculateAdjustedTime(saturdaySunset, 40); // 40 minutes after sunset
  const rabeinuTam = calculateAdjustedTime(saturdaySunset, 72); // 72 minutes after sunset

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Candle Lighting:</span>
          <span className="font-medium">
            {shabbatStart}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Netz HaChama:</span>
          <span className="font-medium">
            {convertToAmPm(netzHachama)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shabbat Ends:</span>
          <span className="font-medium">
            {shabbatEnd}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Rabeinu Tam:</span>
          <span className="font-medium">
            {rabeinuTam}
          </span>
        </div>
      </div>
    </div>
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
