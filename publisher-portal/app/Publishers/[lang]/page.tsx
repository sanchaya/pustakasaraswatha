"use client"
import Image from "next/image";
import Header from '@/components/Header';
import React,{useState, useEffect} from 'react';
import SearchBar from '@/components/searchBar';
import Footer from '@/components/Footer';
import Translation from '@/components/Translation';
import LanguageToggle from '@/components/LanguageToggle';

interface Publisher {
  name:string;
  email: string;
  weburl: string;
  address: string;
  phone: string;
  
  logo: {
    logo: string; 
  };
 
}

 const Publishers =(req: { params: { lang: any; }; },res: any) =>{

  const [publisherData, setPublisherData]=useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPublishers, setfilteredPublishers] = useState<Publisher[]>([]);
  // const [language, setLanguage] = useState('en');
  const language = req.params.lang||'kn';

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
     "http://localhost:3002/getAllPublishers"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
   
    const fetchedData = await response.json();
    console.log(fetchedData.publishersWithLogo);

   setPublisherData(fetchedData.publishersWithLogo);
   
  }

  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(() => {
    if (searchResults.length === 0 && !searchQuery) {
      setfilteredPublishers(publisherData);
    } else {
      setfilteredPublishers(searchResults);
    }
  }, [searchResults, publisherData, searchQuery]);
  

  return (
  <>
   <Header language={language}/>
 
   <div className="mx-auto flex justify-center p-4 mb-4 mt-4">
    <SearchBar onSearch={handleSearch} language={language} />
   </div>
   <hr className="w-full border-t border-black opacity-20 mb-4" />
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-5">

  {filteredPublishers.length > 0 ? (
          filteredPublishers.map((publisher, index) => (
            <div key={index} className="grid">
              <div className="bookCard">
                <div className="bookCover">
                  <Image
                    src={publisher.logo.logo}
                    alt={publisher.name}
                    width={160}
                    height={150}
                  />
                </div>
                <div className="bookDetails">
                  <div className="font-bold">{publisher.name}</div>
                  {publisher.address && (<p><span className="bold-text"><Translation language={language} textKey="publisher_address" />: </span> {publisher.address}</p>)}
                  {publisher.email && (<p><span className="bold-text"><Translation language={language} textKey="email" />: </span>{publisher.email}</p>)} 
                  {publisher.weburl && (<p><span className="bold-text"><Translation language={language} textKey="web_address" />:</span>{publisher.weburl}</p>)}
                  {publisher.phone && (<p><span className="bold-text"><Translation language={language} textKey="contact_no" />: </span>{publisher.phone}</p>)}
                  
                  
                  
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

export default Publishers;