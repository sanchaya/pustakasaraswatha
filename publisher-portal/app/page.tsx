"use client"
import Image from "next/image";
import Header from '@/components/Header';
import React,{useState, useEffect, useRef } from 'react';
import SearchBar from '@/components/searchBar';
import Footer from '@/components/Footer';
import Translation from '@/components/Translation';
import FilterOptions from '@/components/filters';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useLanguage } from '@/contexts/LanguageContext';
interface Book {
  _id:string;
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
interface FetchedData {
  booksWithPhoto: Book[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
 const Home =(req: { params: { lang: any; }; },res: any) =>{

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [bookData, setBookData]=useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [fullData, setFullData] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  // const [filterCriteria, setFilterCriteria] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [hasMore, setHasMore] = useState(true); // Whether more data is available
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  // const [language, setLanguage] = useState('en');
  const { language } = useLanguage();
  const placeholder =language=='en'?' Title | Author | Publisher | Year | ISBN':'ಹುಡುಕು: ಪುಸ್ತಕದ ಹೆಸರು | ಲೇಖಕರ ಹೆಸರು | ಪ್ರಕಾಶಕರು | ವರ್ಷ | ISBN';
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
    try{
      const response = await fetch(
        `https://pubserver.sanchaya.net/books/details?page=${page}`
       );
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
      
       const fetchedData = await response.json();
       const data = fetchedData.booksWithPhoto;
       console.log(fetchedData);
       data.sort((a: { publishedYear: number; }, b: { publishedYear: number; }) => b.publishedYear - a.publishedYear);
      setBookData(data);
      setFetchedData(fetchedData);
       console.log('fetchd')
    }
    catch(error){
      setPage(prevState=>prevState);
      console.error("Error fetching data:", error);
    }
    
   
  }

  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(() => {
    setFilteredBooks(searchResults.length === 0 && !searchQuery ? bookData : searchResults);
  }, [searchResults, bookData, searchQuery]);

  // useEffect(() => {
  //   if (searchResults.length === 0 && !searchQuery) {
  //     setFilteredBooks(bookData);
  //   } else {
  //     setFilteredBooks(searchResults);
  //   }
  // }, [searchResults, bookData, searchQuery]);
  
  const fetchMore = () =>{
    console.log("fetch more")
    fetchData().then();
}

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

  const handleScroll = () => {
    const element = scrollRef.current;
    console.log("elecmet");
    // Check if the scroll position is near the bottom
    if (element) {
      const scrollHeight = element.scrollHeight;
      const scrollTop = element.scrollTop;
      const clientHeight = element.clientHeight;

      if (Math.round(scrollHeight - scrollTop) - 5 < clientHeight && hasMore) {
        fetchMore();
      }
    }
    
};

useEffect(() => {
  if (fetchedData) {
    setFullData((prevFullData) => {
      const combinedData = [...prevFullData, ...fetchedData.booksWithPhoto];

      // Remove duplicates based on the 'id' property
      const uniqueData = Array.from(new Map(combinedData.map(book => [book._id, book])).values());

      return uniqueData;
    });

    setHasMore(fetchedData.currentPage < fetchedData.totalPages);
    setPage(fetchedData.currentPage + 1);
  }
}, [fetchedData]);

const scrollToBottom = () => {
  const element = scrollRef.current;
 
  if (element) {
      element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
      });
      console.log('scroll') 
  }

};
const scrollToUp = () => {
  const element = scrollRef.current;
  if (element) {
      element.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  }

};

  useEffect(() => {
    const element = scrollRef.current;

    if (element) {

        element.addEventListener("scroll", handleScroll);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }
});
  return (
  <>
   <Header />
   {/* <div className="flex items-center justify-between gap-4">
  <div className="flex">
    <LanguageSwitcher />
  </div>
  <div className="flex-grow">
    <SearchBar onSearch={handleSearch} language={language} />
  </div>
</div> */}
   <div className="p-8">
   
    <SearchBar onSearch={handleSearch} placeholder={placeholder} />
   </div>
   <hr className="w-full border-t border-black opacity-20 mb-4" />
   <div className="flex justify-center">
   <FilterOptions onFilter={handleFilter} />
   </div>
  {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-5" ref={scrollRef} style={{ overflowY: 'scroll', maxHeight: '80vh' }}>

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
    

      </div>  */}

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-5" ref={scrollRef} style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
        {searchQuery && searchResults.length === 0 ? (
          <div className="text-sky-800">No matched results!</div>
        ) : (
          (searchQuery || filterOption ? filteredBooks : fullData).map((book, index) => (
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
        )}
      </div>
      <div className="fixed bottom-20 right-4">
      <button
                        onClick={scrollToUp}
                        className="bg-blue-500 p-2 rounded-full"
                    >
                        <BiChevronUp className='{"h-5 w-5"}'/>

                    </button>
      </div>
      <div className="fixed bottom-14 right-4">
      <button
                        onClick={scrollToBottom}
                        className="bg-blue-500 p-2 rounded-full"
                    >
                        <BiChevronDown className='{"h-5 w-5"}'/>

                    </button>
      </div>
      
      <div className="bottom-0 mt-5"><Footer/>
      </div>      

</>
  );
}

export default Home;


