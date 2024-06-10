"use client"

import React, { useState } from 'react';
const SearchBar = ({ onSearch , placeholder}) => {
  const [searchQuery, setSearchQuery] = useState('');

 

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className='w-full'>
    <div className='flex justify-center'>
     
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch(); // Call the search function
            }
        }}
        className='w-1/2 p-2 text-center'
      />
      
    
    </div>
    </div>
  );
};

export default SearchBar;
