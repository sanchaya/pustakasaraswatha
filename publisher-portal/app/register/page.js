"use client"
import React,{useState, useEffect} from 'react';

export default function RegisterForm(){
 
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
        name:"",
        email:"",
        phone_no:"",
        weburl:"",
        logo:"",
        address:"",
      
    });
  
    
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
   
            const data = {
             
              name: formData.name,
              email: formData.email,
              phone_no: formData.phone_no,
              weburl: formData.weburl,
              address:formData.address,
              logo:selectedFile,
              contentType:selectedFile.type,
          
            };
            console.log(data);
            console.log(selectedFile.type);
            const response = await fetch(
              "http://localhost:8000/publishers/register",
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
                name:"",
                email:"",
                phone_no:"",
                weburl:"",
                logo:"",
                address:"",
              });
          
              setSelectedFile(null);
            } else {
              console.error("Failed to submit the form to the backend");
            }
        //   }
        } catch (error) {
          console.error("Error submitting the form:", error);
        }
      };
    
   
    

    
    return (
        <>
     
        <main className="flex flex-col items-center justify-between ">
         
          <div className="p-16">
            <div className=" p-4 rounded-lg shadow-custom ">
              <form onSubmit={handleSubmit}>
                <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-sky-800 mb-8 text-center col-span-2">
                  Register
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
                      Publisher Name<span style={{ color: "red" }}>*</span>:
                    </label>
                    <label>
                      Email<span style={{ color: "red" }}>*</span>:
                    </label>
                    <label>Phone_no:</label>
                    <label>Website Address:</label>
                    <label>Home Address:</label>
                    <label>Logo:</label>
                  
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
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                  
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                   
                   
                    <input
                      type="string"
                      name="weburl"
                      value={formData.weburl}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                      <input
                      type="string"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                    <div className='relative'>
                      <input
                      type="file"
                      accept="image/*"
                      name="logo"
                      className="hidden"
                      id="fileInput"
                      value={formData.logo}
                      onChange={handleFileChange}
                    
                    />
                    <label htmlFor="fileInput"
                    className="appearance-none border border-gray-300 py-2 px-5 rounded-md w-full cursor-pointer"
                     >
                    {selectedFile ? ` ${selectedFile.name}` : "Upload File"}
                    </label>
                    
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                   
                    
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