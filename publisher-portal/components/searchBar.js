"use client"

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState('bookTitle');

  const handleSearch = () => {
    onSearch(searchQuery, selectedCriteria);
  };

  return (
    <div className='flex flex-row gap-1'>
        <select
        value={selectedCriteria}
        onChange={(e) => setSelectedCriteria(e.target.value)}
      >
        <option value="bookTitle">Book Name</option>
        <option value="authorName">Author Name</option>
        <option value="publisherName">Publisher Name</option>
        <option value="publishedYear">Published Year</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search query..."
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch(); // Call the search function
            }
        }}
      />
      
    
    </div>
  );
};

export default SearchBar;
