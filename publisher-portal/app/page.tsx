"use client"
import Image from "next/image";
import Header from '../components/Header';
import React,{useState, useEffect} from 'react';

export default function Home() {

  const [bookData, setBookData]=useState([]);

  const fetchData = async()=>{
    const response = await fetch(
     "http://localhost:8000/books/details"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
   
    const fetchedData = await response.json();
    
   console.log(fetchedData);

 
   setBookData(fetchedData);
   
  }

  useEffect(()=>{
    fetchData();
  },[]);
  console.log(bookData);
  return (
  <>
   <Header/>
  <div className="grid grid-cols-5 gap-4 jusify-between align-center p-4">
        
  {bookData.map((book) => (
    <>
    
    <div className="grid">
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
        <p>{book.authorName}</p>
        <p>{book.publishedYear, book.publishedMonth}</p>
        <p>{book.publisherName}</p>
        <p>{book.subject}</p>
        <p>{book.price}</p>
        </div>
    </div>
    </div>
 

  </>
  ))}
  
  </div>          
   
</>
  );
}
