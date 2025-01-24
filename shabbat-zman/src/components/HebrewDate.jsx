import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import { motion } from 'framer-motion';

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
    <div style={{
      textAlign: 'center',
    }}>
      {hebrewDate && (
        <motion.p
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            fontSize: 'calc(1vw + 0.9rem)',
            fontWeight: '500',
            color: '#ffffff',
            marginBottom: 'calc(0.2vw + 2px)',
          }}>
          {hebrewDate}
        </motion.p>
      )}
      {holidayName && (
        <motion.p
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1.5 // Offset the animation to create a nice effect with the date
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'calc(0.5vw + 0.5rem)',
            color: '#FFE1FF',
          }}>
          {/* <img 
            src="public/assets/images/torah.avif" 
            alt="" 
            style={{
              width: 'calc(0.8vw + 14px)',
              height: 'calc(0.8vw + 14px)',
              marginRight: 'calc(0.3vw + 3px)',
              objectFit: 'contain'
            }}
          /> */}
          {holidayName}
        </motion.p>
      )}
    </div>
  );
};

export default HebrewDate;
