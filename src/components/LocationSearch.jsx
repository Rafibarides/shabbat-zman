import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';

const LocationSearch = ({ onLocationSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationSubmit(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 'min(350px, 80vw)',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        gap: 'calc(0.5vw + 3px)'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a City, Zip Code..."
          style={{
            flex: 1,
            padding: 'calc(0.4vw + 5px) calc(0.6vw + 6px)',
            borderRadius: 'calc(0.8vw + 8px)',
            border: '1px solid #B200CC',
            background: 'rgba(255, 255, 255, 0.09)',
            color: '#ffffff',
            outline: 'none',
            fontSize: 'calc(0.5vw + 0.5rem)'
          }}
        />
        <motion.button 
          type="submit"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)'
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: 1,
            boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
            transition: {
              duration: 0
            }
          }}
          style={{
            padding: 'calc(0.4vw + 5px) calc(0.8vw + 8px)',
            borderRadius: 'calc(0.8vw + 8px)',
            border: 'none',
            background: `linear-gradient(135deg, #B200CC 0%, #74267F 100%)`,
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: 'calc(0.5vw + 0.5rem)'
          }}
        >
          Search
        </motion.button>
      </div>
    </form>
  );
};

LocationSearch.propTypes = {
  onLocationSubmit: PropTypes.func.isRequired,
};

export default LocationSearch; 