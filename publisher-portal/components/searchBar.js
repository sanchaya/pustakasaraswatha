"use client"

import React, { useState } from 'react';
import Translation from '../components/Translation';
const SearchBar = ({ onSearch ,language}) => {
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
        <option value="bookTitle"><Translation language={language} textKey="home"/></option>
        <option value="authorName"><Translation language={language} textKey="author" /></option>
        <option value="publisherName"><Translation language={language} textKey="publisher" /></option>
        <option value="publishedYear"><Translation language={language} textKey="year" /></option>
        <option value="isbn">ISBN</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={language=='en'?'Enter Search Query':'ಹುಡುಕು ಪದ ಟೈಪಿಸಿ'}
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
