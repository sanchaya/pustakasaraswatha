"use client"
import React,{useState, useEffect} from 'react';
import axios from 'axios';

export default function RegisterForm(){
 
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedFile, setSelectedFile]= useState({logo:""});
    const [fileName, setFileName]=useState("");

  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    
    // Check if file exists and its size is within the limit
    if (file && file.size <= 100 * 1024) { // 100 KB limit
      setSelectedFile(file);
      setFileName(file.name);
      setErrorMessage('');
    } else {
      setSelectedFile(null);
      setErrorMessage('File size exceeds 100 KB limit.');
      setFileName("");
    }
    const base64 = await convertToBase64(file);

    setSelectedFile({...selectedFile,logo:base64})
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

      const createLogo = async(newLogo)=>{
        try {
          const response = await axios.post('http://localhost:8000/publishers/logo', newLogo);
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
          setErrorMessage("Please upload a logo");
          return;
        }
        try {
            const isValid = validateForm();
            if(isValid){
            const LogoId=  await createLogo(selectedFile);
            const data = {
             
              name: formData.name,
              email: formData.email,
              phone_no: formData.phone_no,
              weburl: formData.weburl,
              address:formData.address,
              logo:LogoId,
    
            };
         
        
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
              setFileName("");
              setSelectedFile(null);
              alert("Submitted Successfully");
              window.location.href = "/";
            } else {
              console.error("Failed to submit the form to the backend");
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
        phone,
        email
        } = formData;
        console.log("call for validate")
        if(!isValidEmailAddress(email)){
            alert("Invalid Email ");
            return false;
        }

        if(!isValidPhoneNumber(phone)){
          alert("Invalid Phone number");
          return false;
        }
        function isValidPhoneNumber(phoneNumber) {
       
          const phonePattern = /^\d{10}$/; // Assumes 10-digit phone numbers
  
          return phonePattern.test(phoneNumber);
      }
      

      function isValidEmailAddress(email) {
 
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
          return emailPattern.test(email);
      }
        return true;
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
                      Publisher Name:
                    </label>
                    <label>
                      Email:
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
                      required
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                   
                   
                    <input
                      type="string"
                      name="weburl"
                      value={formData.weburl}
                      onChange={handleInputChange}
                      required
                      style={{ padding: "10px", backgroundColor: "#dcdcdc" }}
                    />
                      <input
                      type="string"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
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
                    {fileName ? ` ${fileName}` : "Upload File"}
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