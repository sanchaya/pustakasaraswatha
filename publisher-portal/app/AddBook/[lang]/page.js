"use client"
import React,{useState, useEffect} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import Translation from '@/components/Translation';
import { useUser } from "@clerk/nextjs";
import { useLanguage } from '@/contexts/LanguageContext';
export default function Form(req,res){
  const userRole = localStorage.getItem('userRole');
    const [seriesChecked, setSeriesChecked]=useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedFile, setSelectedFile]= useState({bookCover:""});
    const [fileName, setFileName]=useState("");
    const { language } = useLanguage();
    const { user } = useUser();
  const handleFileChange = async(event) => {
    const file = event.target.files[0];

    // Check if file exists and its size is within the limit
    if (file && file.size <= 100 * 1024) { // 100 KB limit
      setSelectedFile(file);
      setFileName(file.name);
      setErrorMessage('');
    } else {
      setSelectedFile(null);
      setFileName("");
      setErrorMessage('File size exceeds 100 KB limit.');
    }
    const base64 = await convertToBase64(file);

    setSelectedFile({...selectedFile,bookCover:base64})
  };
    const [formData, setFormData]=useState({
        bookTitle:"",
        authorName:"",
        publishedYear:"",
        price:"",
        bookCover:"",
        pageCount:"",
        isbn:"",
        volume:"",
        edition:"",
        isSeries:"",
        seriesName:"",
        subject:"",
        publishedMonth:""
    });
    const handleCorrectionChange = () => {
        setSeriesChecked(!seriesChecked);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      function convertToBase64(file){
        return new Promise((resolve, reject)=>{
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = ()=>{
            resolve(fileReader.result)
          };
          fileReader.onerror =(error)=>{
            reject(error)
          }
        })

      }

      const createCover = async(newCover)=>{
        try {
          const response = await axios.post('https://pubserver.sanchaya.net/upload', newCover);
          const fileId = response.data.message; 
          console.log("Uploaded file ID:", fileId);
          return fileId;
      } catch (error) {
          console.log("Error uploading file:", error);
          throw error; 
      }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(!fileName){
          setErrorMessage('Please upload a file');
          return;
        }

        try {
          const isValid = validateForm();
          if (isValid) {
          const photoId=  await createCover(selectedFile);
          const seriesValue = seriesChecked ? "Yes" : "No";
            if(user){
            const data = {
              series: seriesValue,
              bookTitle: formData.bookTitle,
              pageCount: formData.pageCount,
              authorName: formData.authorName,
              publishedYear: formData.publishedYear,
              isbn: formData.isbn,
              volume:formData.volume,
              price:formData.price,
              bookCover:photoId,
              edition:formData.edition,
              seriesName:formData.seriesName,
              subject:formData.subject,
              publishedMonth:formData.publishedMonth,
              email:user.emailAddresses[0]
            };
  
        
            const bookResponse = await fetch(
              "https://pubserver.sanchaya.net/books/save-book-data",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
    
            if (bookResponse.ok) {
              setFormData({
                bookTitle:"",
                authorName:"",
                publishedYear:"",
                publishedMonth:"",
                price:"",
                bookCover:"",
                pageCount:"",
                isbn:"",
                volume:"",
                edition:"",
                isSeries:"",
                seriesName:"",
                subject:""
              });
              setSeriesChecked(false);
              setSelectedFile(null);
              setFileName("");
            } else {
              console.error("Failed to submit the form to the backend");
            }
        }
          }
          else{
            console.error("Error validating the form");
          }
        } catch (error) {
          console.error("Error submitting the form:", error);
        }
      };
    
      const validateForm = () => {
        const {
        publishedMonth,
          pageCount,
          isbn,
         publishedYear,
         price
        } = formData;
        console.log("call for validate")
        if(price<=0){
          alert("Price should be a positive number");
          return false;
        }
        if (pageCount <= 0) {
          alert("Total pages should be a positive number");
          return false;
        }
        if(publishedMonth <=0 || publishedMonth>12){
          alert("Invalid Published Month ");
          return false;
        }
        if (!isValidYear(publishedYear)) {
          alert("Invalid Published Year");
          return false;
        }
        if(!isValidYearMonth(publishedMonth,publishedYear)){
          alert("Invalid Month for Year");
          return false;
        }
        if(isbn && !isValidISBN(isbn)){
          alert("Invalid ISBN");
          return false;
        }

        function isValidYear(year) {
         
          return /^\d{4}$/.test(year) && parseInt(year) >= 0 && parseInt(year) <= new Date().getFullYear();
        }

        function isValidISBN(str) {
 
          str = str.replace(/[^0-9X]/gi, '');

         if (str.length !== 10 && str.length !== 13) {
            return false;
          }

          if (str.length === 13) {
           let sum = 0;
               for (let i = 0; i < 12; i++) {
               const digit = parseInt(str[i]);
                sum += i % 2 === 1 ? 3 * digit : digit;
               }
             const check = (10 - (sum % 10)) % 10;
             return check === parseInt(str[str.length - 1]);
            }

          if (str.length === 10) {
             let weight = 10;
               let sum = 0;
              for (let i = 0; i < 9; i++) {
               const digit = parseInt(str[i]);
               sum += weight * digit;
               weight--;
             }
             let check = (11 - (sum % 11)) % 11;
              if (check === 10) {
               check = 'X';
              }
         return check === str[str.length - 1].toUpperCase();
        }
      }
      function isValidYearMonth(publishedMonth,publishedYear){
        if(publishedYear== new Date().getFullYear() && publishedMonth> new Date().getMonth()+1){
          return false;
        }
        return true;
      }
        return true;
      };
    
    
    return (
        <>
         <Header />
        <main className="flex flex-col items-center justify-between ">
         
          <div className="p-4">
            <div className=" p-4 rounded-lg shadow-custom ">
        
              <form onSubmit={handleSubmit} className="max-w-full px-4">
  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-sky-800 mb-8 text-center">Enter the Book Details</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="book_name" />:<span className="text-red-600">*</span>:
      </label>
      <input type="text" name="bookTitle" placeholder='Enter Book Title' value={formData.bookTitle} onChange={handleInputChange} className="px-4 py-2 bg-black-300 rounded-md" required  />
    </div>
    <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="pages" /><span className="text-red-600">*</span>:
      </label>
      <input type="number" name="pageCount" placeholder='Enter Total Pages' value={formData.pageCount} onChange={handleInputChange} required className="px-4 py-2  rounded-md" />
    </div>
    {/* <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="author" /><span className="text-red-600">*</span>:
      </label>
      <input type="text" name="authorName" placeholder='Enter Author Name' value={formData.authorName} onChange={handleInputChange} required className="px-4 py-2  rounded-md" />
    </div> */}
       {userRole === 'publisher' && (
                  <div className="flex flex-col">
                    <label className="text-sky-600">
                      Author Name:<span className="text-red-600">*</span>:
                    </label>
                    <input type="text" name="authorName" placeholder='Enter Author Name' value={formData.authorName} onChange={handleInputChange} required className="px-4 py-2  rounded-md" />
                  </div>
                )}
                {userRole === 'author' && (
                  <div className="flex flex-col">
                    <label className="text-sky-600">
                      Publisher Name:<span className="text-red-600">*</span>:
                    </label>
                    <input type="text" name="authorName" placeholder='Enter Publisher Name' value={formData.authorName} onChange={handleInputChange} required className="px-4 py-2  rounded-md" />
                  </div>
                )}
    <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="year" /><span className="text-red-600">*</span>:
      </label>
      <div className="flex">
        <input type="number" name="publishedMonth" placeholder="Month" value={formData.publishedMonth} onChange={handleInputChange} required className="px-4 py-2  rounded-md flex-1 mr-1" />
        <input type="number" name="publishedYear" placeholder="Year" value={formData.publishedYear} onChange={handleInputChange} required className="px-4 py-2  rounded-md flex-1 ml-1" />
      </div>
    </div>
    <div className="flex flex-col">
      <label className="text-sky-600">
        ISBN:
      </label>
      <input type="string" name="isbn" placeholder='Enter ISBN' value={formData.isbn} onChange={handleInputChange} className="px-4 py-2 rounded-md" />
    </div>
    <div className="flex flex-col">
      <label className="text-sky-600 mb-3">
      <Translation language={language} textKey="thumbnail" /><span className="text-red-600 ">*</span>:
      </label>
      <div className="relative">
        <input type="file" accept="image/*" name="bookCover" className="hidden mt-2" id="fileInput" value={formData.bookCover} onChange={handleFileChange} />
        <label htmlFor="fileInput" className="px-4 py-2  rounded-md w-full cursor-pointer border border-gray-300">
          {fileName ? ` ${fileName}` : "Upload File"}
        </label>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
    <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="price" /><span className="text-red-600">*</span>:
      </label>
      <input type="number" name="price" placeholder='Enter Price' value={formData.price} onChange={handleInputChange} required className="px-4 py-2  rounded-md" />
    </div>
    <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="volume" />:
      </label>
      <input type="string" name="volume" placeholder='Enter Volume' value={formData.volume} onChange={handleInputChange} className="px-4 py-2  rounded-md" />
    </div>
    <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="edition" />:
      </label>
      <input type="string" name="edition" placeholder='Enter Edition' value={formData.edition} onChange={handleInputChange} className="px-4 py-2  rounded-md" />
    </div>
    <div className="flex flex-col">
      <label className="text-sky-600">
      <Translation language={language} textKey="subject" />:
      </label>
      <input type="string" name="subject" placeholder='Enter Subject/Genre' value={formData.subject} onChange={handleInputChange} className="px-4 py-2  rounded-md" />
    </div>
    <div className="flex items-center">
      <input type="checkbox" id="series" name="series" checked={seriesChecked} onChange={handleCorrectionChange} className="transform scale-200 mr-2" />
      <label htmlFor="series" className="text-sky-600">
      <Translation language={language} textKey="is_series" />
      </label>
    </div>
    {seriesChecked && (
      <div className="flex flex-col">
        <label className="text-sky-600">
        <Translation language={language} textKey="series_name" /><span className="text-red-600">*</span>:
        </label>
        <input type="string" name="seriesName" placeholder='Enter Series Name' value={formData.seriesName} onChange={handleInputChange} required className="px-4 py-2  rounded-md" />
      </div>
    )}
  </div>
  <div className="mt-8 flex justify-end">
    <button className="bg-sky-800 hover:bg-sky-600 text-white px-6 py-3 rounded-md" type="submit">
      Submit
    </button>
  </div>
</form>

            </div>
          
          </div>
        </main>
        <div className="bottom-0 mt-8"><Footer/>
      </div>  
        </>
      );
}