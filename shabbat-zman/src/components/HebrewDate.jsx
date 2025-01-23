import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';

const HebrewDate = () => {
  const [hebrewDate, setHebrewDate] = useState('');
  const [holidayName, setHolidayName] = useState('');

  useEffect(() => {
    const fetchHebrewDate = async () => {
      try {
        const today = new Date();
        // Build the API URL for the converter
        const url = `https://www.hebcal.com/converter?cfg=json&gy=${today.getFullYear()}&gm=${today.getMonth() + 1}&gd=${today.getDate()}&g2h=1`;

        const [data, error] = await fetchData(url);
        if (error || !data) {
          console.error('Error fetching Hebrew date:', error);
          return;
        }

        // Extract Hebrew date (in Hebrew) and holiday name if available
        if (data.hebrew) {
          setHebrewDate(data.hebrew);
        }
        if (data.events && data.events.length > 0) {
          setHolidayName(data.events[0]);
        }
      } catch (err) {
        console.error('Hebrew date fetch error:', err);
      }
    };

    fetchHebrewDate();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-2">
      {hebrewDate && (
        <>
          <p className="text-md">{hebrewDate}</p>
        </>
      )}

      {holidayName && (
        <>
          <p>{holidayName}</p>
        </>
      )}
    </div>
  );
};

export default HebrewDate;
