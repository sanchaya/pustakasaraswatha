"use client"
import React, {useState} from 'react';

const FilterOptions = ({ onFilter }) => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleFilter = (filterOption) => {
  
    onFilter(filterOption);
    setClickedButton(filterOption);
  };

  return (
    <div className="flex flex-row gap-2 mb-2 ml-2 align-center items-center">

        <button className={`rounded-lg border-2 border-gray-300  px-2 py-2 ${clickedButton === "recentlyUploaded" ? 'bg-gray-300' : 'hover:bg-gray-300'}`} onClick={()=> handleFilter("recentlyUploaded")}>Recently Uploaded</button>
        <button className={`rounded-lg border-2 border-gray-300  px-2 py-2 ${clickedButton === "year" ? 'bg-gray-300' : 'hover:bg-gray-300'}`} onClick={()=> handleFilter("year")}>Year</button>
        <button className={`rounded-lg border-2 border-gray-300  px-2 py-2 ${clickedButton === "publisherName" ? 'bg-gray-300' : 'hover:bg-gray-300'}`} onClick={()=> handleFilter("publisherName")}>Publisher Name</button>
        <button className={`rounded-lg border-2 border-gray-300  px-2 py-2 ${clickedButton === "bookTitle" ? 'bg-gray-300' : 'hover:bg-gray-300'}`} onClick={()=> handleFilter("bookTitle")}>Book Title</button>
 
 
    </div>
  );
};

export default FilterOptions;
