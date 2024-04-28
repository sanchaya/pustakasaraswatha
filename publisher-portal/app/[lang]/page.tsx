"use client"
import Image from "next/image";
import Header from '../../components/Header';
import React,{useState, useEffect} from 'react';
import SearchBar from '@/components/searchBar';
import Footer from '../../components/Footer';
import Translation from '../../components/Translation';
import LanguageToggle from '../../components/LanguageToggle';

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
  // const [language, setLanguage] = useState('en');
  const language = req.params.lang;

  // const handleLanguageChange = (selectedLanguage: React.SetStateAction<string>) => {
  //   setLanguage(selectedLanguage);
  // };
  const handleSearch = async (query: string|number , criteria: any) => {
    try {
      setSearchQuery(String(query));
      if (!query) {
        setSearchResults([]);
        return; // No need to proceed further if the query is empty
      }
      const response = await fetch(`https://pubserver.sanchaya.net/books/search?query=${encodeURIComponent(query)}&criteria=${criteria}`);
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
  

  return (
  <>
   <Header language={language}/>
 
   <div className="mx-auto flex justify-center p-4 mb-4 mt-4">
    <SearchBar onSearch={handleSearch} language={language} />
   </div>
   <hr className="w-full border-t border-black opacity-20 mb-4" />
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