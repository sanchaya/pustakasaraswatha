"use client"

import Header from '@/components/Header';
import React,{useState, useEffect} from 'react';
import Link from "next/link";
import Footer from '@/components/Footer';
import { useUser } from "@clerk/nextjs";

const Admin =(req: { params: { lang: any; }; },res: any) =>{

 const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser();
    const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

   useEffect(() => {
    if (user) {
      const userRole = user.publicMetadata.userRole;
      setIsAdmin(userRole === "admin");
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('');
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('csv', selectedFile);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://pubserver.sanchaya.net/uploadCSV', true);

      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = function () {
        if (xhr.status === 200) {
          setUploadStatus('File uploaded successfully!');
        } else {
          setUploadStatus('Upload failed. Try again.');
        }
      };

      xhr.onerror = function () {
        setUploadStatus('An error occurred during upload.');
      };

      xhr.send(formData);
    } catch (error) {
      setUploadStatus('Something went wrong!');
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


   
  }

  useEffect(()=>{
    fetchData();
  },[]);



  return (
  <>
   {!isAdmin && (
        <>
          <div className="text-center mt-20">
            <h1 className="text-3xl text-black">This Page is restricted</h1>
          </div>
          <div className="text-center mt-20">
            <Link href="/">Return to Homepage</Link>
          </div>
        </>
      )}
    
    {isAdmin && (
        <>
             <Header />
        <div className="flex flex-col items-center justify-center mt-10">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mb-4"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Upload CSV
            </button>

            {uploadProgress > 0 && (
              <div className="mt-4 text-center">
                Uploading: {uploadProgress}%
              </div>
            )}

            {uploadStatus && (
              <div className="mt-2 text-center text-green-600">
                {uploadStatus}
              </div>
            )}
          </div>

          <hr className="w-full border-t border-black opacity-20 mt-8 mb-4" />

      <div className="bottom-0 mt-8"><Footer/>
      </div>
        </>
    )}
        

</>
  );
}

export default Admin;