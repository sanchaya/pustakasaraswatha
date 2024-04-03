"use client"
import Image from "next/image";
import Header from '../components/Header';
import React,{useState, useEffect} from 'react';
import SearchBar from '../components/searchBar';

export default function Home() {

  const [bookData, setBookData]=useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string|number , criteria: any) => {
    try {
      setSearchQuery(query);
      if (!query) {
        setSearchResults([]);
        return; // No need to proceed further if the query is empty
      }
      const response = await fetch(`http://localhost:8000/books/search?query=${encodeURIComponent(query)}&criteria=${criteria}`);
      if (!response.ok) {
        throw new Error('Failed to search books');
      }
      const searchData = await response.json();
      setSearchResults(searchData);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };
  const fetchData = async()=>{
    const response = await fetch(
     "http://localhost:8000/books/details"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
   
    const fetchedData = await response.json();

   setBookData(fetchedData);
   
  }

  useEffect(()=>{
    fetchData();
  },[]);


  const filteredBooks = searchResults.length == 0 && !searchQuery ? bookData :searchResults ;
  console.log(searchQuery);
  return (
  <>
   <Header/>
   <div className="mx-auto flex justify-center p-4">
    <SearchBar onSearch={handleSearch} />
   </div>
  <div className="grid grid-cols-7 gap-2 jusify-between align-center p-5 ">
        
  {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div key={index} className="grid">
              <div className="bookCard">
                <div className="bookCover">
                  <Image
                    src={book.book_photo.bookCover}
                    alt={book.bookTitle}
                    width={160}
                    height={250}
                  />
                </div>
                <div className="bookDetails">
                  <h2>{book.bookTitle}</h2>
                  {book.authorName && (<p>Author: {book.authorName}</p>)} 
                  {book.publishedYear && (<p>Published Year:{book.publishedYear}</p>)}
                  {book.subject && (<p>Subject: {book.subject}</p>)}
                  {book.price && (<p>Price: {book.price}</p>)}
                </div>
              </div>
            </div>
          ))
        ) : (
     
          <div className="text-sky-800">No matched results!</div>
         
        )}
      </div>          

</>
  );
}
