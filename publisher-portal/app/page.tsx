"use client"
import Image from "next/image";
import Header from '@/components/Header';
import React,{useState, useEffect, useRef } from 'react';
import SearchBar from '@/components/searchBar';
import Footer from '@/components/Footer';
import Translation from '@/components/Translation';
import FilterOptions from '@/components/filters';

interface Book {
  pageCount: React.JSX.Element;
  bookTitle: string;
  authorName: string;
  publishedYear: number;
  subject: string;
  price: number;
  
  book_photo: {
    bookCover: string; // Assuming bookCover is a string
  };
  // Add more properties as needed
}

 const Home =(req: { params: { lang: any; }; },res: any) =>{

  const [bookData, setBookData]=useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  // const [filterCriteria, setFilterCriteria] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [hasMore, setHasMore] = useState(true); // Whether more data is available
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  // const [language, setLanguage] = useState('en');
  const language = req.params.lang||'kn';
  const limit = 12; 
  const observer = useRef();
  // const handleLanguageChange = (selectedLanguage: React.SetStateAction<string>) => {
  //   setLanguage(selectedLanguage);
  // };
  const handleSearch = async (query: string|number) => {
    try {
      setSearchQuery(String(query));
      if (!query) {
        setSearchResults([]);
        return; // No need to proceed further if the query is empty
      }
      const response = await fetch(`https://pubserver.sanchaya.net/books/search?query=${encodeURIComponent(query)}`);
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
     "https://pubserver.sanchaya.net/books/details"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
   
    const fetchedData = await response.json();
    fetchedData.sort((a: { publishedYear: number; }, b: { publishedYear: number; }) => b.publishedYear - a.publishedYear);
   setBookData(fetchedData);
   
  }

  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(() => {
    if (searchResults.length === 0 && !searchQuery) {
      setFilteredBooks(bookData);
    } else {
      setFilteredBooks(searchResults);
    }
  }, [searchResults, bookData, searchQuery]);
  
  // useEffect(() => {
  //   const sortedBooks = [...filteredBooks].sort((a, b) => b.publishedYear - a.publishedYear);
  //   setFilteredBooks(sortedBooks);
  // }, [filteredBooks]);
  const handleFilter = (option: React.SetStateAction<string>) => {
    setFilterOption(option);
  };
  useEffect(() => {
    let sortedBooks = [...bookData];
    if (filterOption === 'recentlyUploaded') {
      sortedBooks.sort((a: { uploadedAt: Date; }, b: { uploadedAt: Date; }) => {
        const dateA = new Date(a.uploadedAt);
        const dateB = new Date(b.uploadedAt);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (filterOption === 'year') {
      // Sort by year
      sortedBooks.sort((a: { publishedYear: number; }, b: { publishedYear: number; }) => b.publishedYear - a.publishedYear);
    } else if (filterOption === 'publisherName'){
      sortedBooks.sort((a: { publisherName?: string }, b: { publisherName?: string }) => {
        // Check if publisherName exists and is not undefined for both objects
        if (a.publisherName && b.publisherName) {
          return a.publisherName.localeCompare(b.publisherName);
        } else if (a.publisherName) {
          return 1; // Move objects with publisherName to the end
        } else if (b.publisherName) {
          return -1; // Move objects with publisherName to the beginning
        } else {
          return 0; // If both are undefined, maintain current order
        }
      });
    } else if (filterOption === 'bookTitle'){
      // Sort by book title
      sortedBooks.sort((a: {bookTitle: string; }, b: { bookTitle: string; }) => a.bookTitle.localeCompare(b.bookTitle));
    }
    setFilteredBooks(sortedBooks);
  }, [bookData, filterOption]);
  
  return (
  <>
   <Header language={language}/>
 
   <div className="p-8">
   
    <SearchBar onSearch={handleSearch} language={language} />
   </div>
   <hr className="w-full border-t border-black opacity-20 mb-4" />
   <FilterOptions onFilter={handleFilter} />
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-5">

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
                  <div className="font-bold">{book.bookTitle}</div>
                  {book.subject && (<p><span className="bold-text"><Translation language={language} textKey="home" />: </span> {book.subject}</p>)}
                  {book.authorName && (<p><span className="bold-text"><Translation language={language} textKey="author" />: </span>{book.authorName}</p>)} 
                  {book.pageCount && (<p><span className="bold-text"><Translation language={language} textKey="pages" />:</span>{book.pageCount}</p>)}
                  {book.price && (<p><span className="bold-text"><Translation language={language} textKey="price" />: </span>{book.price}</p>)}
                  {book.publishedYear && (<p><span className="bold-text"><Translation language={language} textKey="year" />: </span>{book.publishedYear}</p>)}
                  
                  
                </div>
              </div>
            </div>
          ))
        ) : (
     
          <div className="text-sky-800">No matched results!</div>
         
        )}
      </div>    
      <div className="bottom-0 mt-8"><Footer/>
      </div>      

</>
  );
}

export default Home;