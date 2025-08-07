import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LocationSearch = ({ onLocationSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const suggestionsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationSubmit(searchQuery.trim());
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery) {
        setSuggestions([]);
        return;
      }

      try {
        const API_KEY = 'a693943efa754abb860163744241803';
        const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        setSuggestions(data || []);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSuggestionClick = (locationName) => {
    setSearchQuery(locationName);
    onLocationSubmit(locationName);
    setIsFocused(false);
  };

  return (
    <>
      <style>
        {`
          .location-suggestion-item:hover {
            background-color: rgba(178, 0, 204, 0.15) !important;
            transition: background-color 0.2s ease;
          }
          .search-input:focus {
            border-color: #D946EF !important;
            box-shadow: 0 0 0 2px rgba(217, 70, 239, 0.1) !important;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
        `}
      </style>
      <form 
        onSubmit={handleSubmit} 
        style={{
          width: '100%',
          position: 'relative',
        }}
        className="search-form"
      >
      <div style={{
        display: 'flex',
        gap: 'calc(0.3vw + 2px)',
        width: '100%'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 150);
          }}
          placeholder="Enter a City, Zip Code..."
          style={{
            flex: 1,
            borderRadius: 'calc(0.6vw + 6px)',
            border: '1px solid #B200CC',
            background: 'rgba(255, 255, 255, 0.09)',
            color: '#ffffff',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          className="search-input"
        />
        <motion.button 
          type="submit"
          whileHover={{ 
            scale: 1.02,
            filter: 'brightness(1.1)'
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "tween",
            duration: 0.2,
            ease: "easeInOut"
          }}
          style={{
            borderRadius: 'calc(0.6vw + 6px)',
            border: 'none',
            background: `linear-gradient(135deg, #B200CC 0%, #74267F 100%)`,
            color: '#ffffff',
            cursor: 'pointer',
          }}
          className="search-button"
        >
          Search
        </motion.button>
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          style={{
            position: 'absolute',
            top: 'calc(100% + 2px)',
            left: 0,
            right: 0,
            background: 'rgba(20, 4, 25, 0.85)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            margin: 0,
            padding: '8px 0',
            listStyle: 'none',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 100
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.id || item.name}
              onMouseDown={() => handleSuggestionClick(item.name)}
              className="location-suggestion-item"
              style={{
                padding: '6px 12px',
                cursor: 'pointer',
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 'calc(0.3vw + 0.4rem)'
              }}
            >
              {item.name}
              {item.region ? `, ${item.region}` : ''}
              {item.country ? `, ${item.country}` : ''}
            </li>
          ))}
        </ul>
      )}
      </form>
    </>
  );
};

LocationSearch.propTypes = {
  onLocationSubmit: PropTypes.func.isRequired,
};

export default LocationSearch; 