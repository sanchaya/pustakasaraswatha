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
  
  return (
    <main >
        <Header/>
        <div className="grid grid-cols-5 gap-4 jusify-between align-center">
            
          
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
              <div>Image1</div>
        </div>
    </main>
  );
}
