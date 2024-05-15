"use client"
import React from 'react';

const FilterOptions = ({ onFilter }) => {
  const handleFilter = (filterOption) => {
    onFilter(filterOption);
  };

  return (
    <div className="flex flex-row gap-2 mb-2 ml-2 align-center items-center">
   
        <input
          type="radio"
          id="recentlyUploaded"
          name="filterOption"
          value="recentlyUploaded"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="recentlyUploaded" className="ml-2">Recently Uploaded</label>
     
      
        <input
          type="radio"
          id="year"
          name="filterOption"
          value="year"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="year" className="ml-2">Year</label>
      
      
        <input
          type="radio"
          id="publisherName"
          name="filterOption"
          value="publisherName"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="publisherName" className="ml-2">Publisher Name</label>
     
      
        <input
          type="radio"
          id="bookTitle"
          name="filterOption"
          value="bookTitle"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="bookTitle" className="ml-2">Book Title</label>
     
    </div>
  );
};

export default FilterOptions;
