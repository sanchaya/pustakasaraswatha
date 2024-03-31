"use client"
import React,{useState, useEffect} from 'react';
import Header from '@/components/Header';
export default function Form(){
    const [seriesChecked, setSeriesChecked]=useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedFile, setSelectedFile]= useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    // Check if file exists and its size is within the limit
    if (file && file.size <= 100 * 1024) { // 100 KB limit
      setSelectedFile(file);
      setErrorMessage('');
    } else {
      setSelectedFile(null);
      setErrorMessage('File size exceeds 100 KB limit.');
    }
  };
    const [formData, setFormData]=useState({
        bookTitle:"",
        authorName:"",
        publishedYear:"",
        price:"",
        photo:"",
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Validate that "Year" and "Pages Scanned" are positive numbers
        //   const isValid = validateForm();
        //   if (isValid) {
            const seriesValue = seriesChecked ? "Yes" : "No";
        
            const data = {
              series: seriesValue,
              bookTitle: formData.bookTitle,
              pageCount: formData.pageCount,
              authorName: formData.authorName,
              publishedYear: formData.publishedYear,
              isbn: formData.isbn,
              volume:formData.volume,
              price:formData.price,
              photo:selectedFile,
              contentType:selectedFile.type,
              fileName:selectedFile,
              edition:formData.edition,
              seriesName:formData.seriesName,
              subject:formData.subject,
              publishedMonth:formData.publishedMonth
            };
            console.log(data);
            console.log(selectedFile.type);
            const response = await fetch(
              "http://localhost:8000/books/save-book-data",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
    
            if (response.ok) {
              setFormData({
                bookTitle:"",
                authorName:"",
                publishedYear:"",
                publishedMonth:"",
                price:"",
                photo:"",
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
            } else {
              console.error("Failed to submit the form to the backend");
            }
        //   }
        } catch (error) {
          console.error("Error submitting the form:", error);
        }
      };
    
    //   const validateForm = () => {
    //     const {
    //       bookTitle,
    //       pageCount,
    //       
    //     year,
         
    //     } = formData;
    
    //     if (!bookTitle || !pageCount) {
    //       alert("Title, Total pages  fields are required");
    //       return false;
    //     }
    
    //     if (pageCount <= 0) {
    //       alert("Total pages scanned should be a positive number");
    //       return false;
    //     }
    
    //     if (year && year <= 0) {
    //       alert("Year of publication should be a positive number");
    //       return false;
    //     }
    
    //     return true;
    //   };
    
    return (
        <>
         <Header/>
        <main className="flex flex-col items-center justify-between ">
         
          <div className="p-4">
            <div className=" p-4 rounded-lg shadow-custom ">
              <form onSubmit={handleSubmit}>
                <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-sky-800 mb-8 text-center col-span-2">
                  Enter the Book Details
                </h1>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      color: "#0369a1",
                      display: "flex",
                      flexDirection: "column",
                      gap: "45px",
                    }}
                  >
                    
                    <label>
                      Book Name<span style={{ color: "red" }}>*</span>:
                    </label>
                    <label>
                      Total Pages<span style={{ color: "red" }}>*</span>:
                    </label>
                    <label>Author:</label>
                    <label>Published Year:</label>
                    <label>ISBN:</label>
                    <label>Thumbnail:</label>
                    <label>Price:</label>
                    <label>Volume:</label>
                    <label>Edition:</label>
                    <label>Subject:</label>
                    <label>Is Related to Series?:</label>
                    {seriesChecked && (<label>SeriesName<span style={{ color: "red" }}>*</span>:</label>)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "25px",
                    }}
                  >
                    
                    <input
                      type="text"
                      name="bookTitle"
                      value={formData.bookTitle}
                      onChange={handleInputChange}
                      required
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                    <input
                      type="number"
                      name="pageCount"
                      value={formData.pageCount}
                      onChange={handleInputChange}
                      required
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                  
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                   
                   <div style={{ display: "flex" }}>
                      <input
                        type="number"
                        name="publishedMonth"
                        placeholder="Month"
                        value={formData.publishedMonth}
                        onChange={handleInputChange}
                        style={{ padding: "10px", backgroundColor: "#dcdcdc", flex: "0.5", marginRight: "2px" }}
                      />
                      <input
                          type="number"
                        name="publishedYear"
                         placeholder="Year"
                        value={formData.publishedYear}
                        onChange={handleInputChange}
                        style={{ padding: "10px", backgroundColor: "#dcdcdc", flex: "0.5", marginLeft: "2px" }}
                      />
                    </div>
                    <input
                      type="string"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                    <div className='relative'>
                      <input
                      type="file"
                      accept="image/*"
                      name="photo"
                      className="hidden"
                      id="fileInput"
                      value={formData.photo}
                      onChange={handleFileChange}
                    
                    />
                    <label htmlFor="fileInput"
                    className="appearance-none border border-gray-300 py-2 px-5 rounded-md w-full cursor-pointer"
                     >
                    {selectedFile ? ` ${selectedFile.name}` : "Upload File"}
                    </label>
                    
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                     <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                     <input
                      type="string"
                      name="volume"
                      value={formData.volume}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                   
                     <input
                      type="string"
                      name="edition"
                      value={formData.edition}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                     <input
                      type="string"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                  
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        id="series"
                        name="series"
                        checked={seriesChecked}
                        onChange={handleCorrectionChange}
                        style={{
                          marginLeft: "10px",
                          transform: "scale(2.0)",
                          padding: "10px",
                          marginBottom: "10px",
                          marginTop:"20px",
                        }}
                      />
                    </div>
                    {seriesChecked && (<input
                      type="string"
                      name="seriesName"
                      value={formData.seriesName}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                    )}
                  </div>
                </div>
                <div className="mt-4 ml-auto w-40">
                  <button className="button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          
          </div>
        </main>

        </>
      );
}