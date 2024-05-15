"use client"

import React, { useState } from 'react';
const SearchBar = ({ onSearch ,language}) => {
  const [searchQuery, setSearchQuery] = useState('');

 

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className='w-full'>
    <div className='flex justify-center'>
        {/* <select
        value={selectedCriteria}
        onChange={(e) => setSelectedCriteria(e.target.value)}
      >
        <option value="bookTitle"><Translation language={language} textKey="home"/></option>
        <option value="authorName"><Translation language={language} textKey="author" /></option>
        <option value="publisherName"><Translation language={language} textKey="publisher" /></option>
        <option value="publishedYear"><Translation language={language} textKey="year" /></option>
        <option value="isbn">ISBN</option>
      </select> */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={language=='en'?' Title | Author | Publisher | Year | ISBN':' ಪುಸ್ತಕದ ಹೆಸರು | ಲೇಖಕರ ಹೆಸರು | ಪ್ರಕಾಶಕರ ಹೆಸರು | ವರ್ಷ | ISBN'}
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
