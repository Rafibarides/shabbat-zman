import PropTypes from 'prop-types';
import { useState } from 'react';

const LocationSearch = ({ onLocationSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationSubmit(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter city, zip code, or address"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

LocationSearch.propTypes = {
  onLocationSubmit: PropTypes.func.isRequired,
};

export default LocationSearch; 