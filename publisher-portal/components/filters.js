import React from 'react';

const FilterOptions = ({ onFilter }) => {
  const handleFilter = (filterOption) => {
    onFilter(filterOption);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="p-2 border border-gray-300 rounded-md mb-2">
        <input
          type="radio"
          id="recentlyUploaded"
          name="filterOption"
          value="recentlyUploaded"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="recentlyUploaded" className="ml-2">Recently Uploaded</label>
      </div>
      <div className="p-2 border border-gray-300 rounded-md mb-2">
        <input
          type="radio"
          id="year"
          name="filterOption"
          value="year"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="year" className="ml-2">Year</label>
      </div>
      <div className="p-2 border border-gray-300 rounded-md mb-2">
        <input
          type="radio"
          id="publisherName"
          name="filterOption"
          value="publisherName"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="publisherName" className="ml-2">Publisher Name</label>
      </div>
      <div className="p-2 border border-gray-300 rounded-md mb-2">
        <input
          type="radio"
          id="bookTitle"
          name="filterOption"
          value="bookTitle"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <label htmlFor="bookTitle" className="ml-2">Book Title</label>
      </div>
    </div>
  );
};

export default FilterOptions;
