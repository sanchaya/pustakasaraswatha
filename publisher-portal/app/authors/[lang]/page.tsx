"use client"
import Image from "next/image";
import Header from '@/components/Header';
import React,{useState, useEffect} from 'react';
import SearchBar from '@/components/searchBar';
import Footer from '@/components/Footer';
import Translation from '@/components/Translation';
import { useLanguage } from "@/contexts/LanguageContext";


interface Author {
  name:string;
  email: string;
  weburl: string;
  address: string;
  phone: string;
  
  logo: {
    logo: string; 
  };
 
}

 const Authors =(req: { params: { lang: any; }; },res: any) =>{

  const [authorData, setAuthorData]=useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAuthors, setfilteredAuthors] = useState<Author[]>([]);
  // const [language, setLanguage] = useState('en');
  // const language = req.params.lang||'kn';
  const { language } = useLanguage();
  const placeholder = language === 'en' ? 'Name|Address|Phone|Email|Website' : 'ಹೆಸರು|ವಿಳಾಸ|ಫೋನ್|ಇಮೇಲ್|ವೆಬ್‌ಸೈಟ್';
  // const handleLanguageChange = (selectedLanguage: React.SetStateAction<string>) => {
  //   setLanguage(selectedLanguage);
  // };
  const handleSearch = async (query: string|number ) => {
    try {
      setSearchQuery(String(query));
      if (!query) {
        setSearchResults([]);
        return; // No need to proceed further if the query is empty
      }
      const response = await fetch(`https://pubserver.sanchaya.net/authors/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search authors');
      }
      const searchData = await response.json();
      setSearchResults(searchData);
    } catch (error) {
      console.error('Error searching authors:', error);
    }
  };
  const fetchData = async()=>{
    const response = await fetch(
     "https://pubserver.sanchaya.net/getAllAuthors"
    );
    if (!response.ok) {
      console.log('No authors');
    }
   
    const fetchedData = await response.json();
    console.log(fetchedData.authorsWithLogo);

   setAuthorData(fetchedData.authorsWithLogo);
   
  }

  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(() => {
    if (searchResults.length === 0 && !searchQuery) {
      setfilteredAuthors(authorData);
    } else {
      setfilteredAuthors(searchResults);
    }
  }, [searchResults, authorData, searchQuery]);
  

  return (
  <>
   <Header />
 
   <div className="mx-auto flex justify-center p-4 mb-4 mt-4">
    <SearchBar onSearch={handleSearch} placeholder={placeholder} />
   </div>
   <hr className="w-full border-t border-black opacity-20 mb-4" />
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-5">

  {filteredAuthors.length > 0 ? (
          filteredAuthors.map((author, index) => (
            <div key={index} className="grid">
              <div className="bookCard">
                <div className="bookCover">
                  <Image
                    src={author.logo.logo}
                    alt={author.name}
                    width={160}
                    height={150}
                  />
                </div>
                <div className="bookDetails">
                  <div className="font-bold">{author.name}</div>
                  {author.address && (<p><span className="bold-text"><Translation language={language} textKey="author_address" />: </span> {author.address}</p>)}
                  {author.email && (<p><span className="bold-text"><Translation language={language} textKey="email" />: </span>{author.email}</p>)} 
                  {author.weburl && (<p><span className="bold-text"><Translation language={language} textKey="web_address" />:</span>{author.weburl}</p>)}
                  {author.phone && (<p><span className="bold-text"><Translation language={language} textKey="contact_no" />: </span>{author.phone}</p>)}
                  
                  
                  
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

export default Authors;