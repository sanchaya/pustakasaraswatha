"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const LanguageToggle = ({ onChange }) => {
  const [language, setLanguage] = useState('en');
  const router = useRouter();
  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'kn' : 'en';
    const newPath = `/${newLanguage}${router.pathname}`;
    console.log(newPath);
    router.push(newPath).catch((error) => console.error('Navigation error:', error));
    setLanguage(newLanguage);
    onChange(newLanguage);
   
  };


  return (

    <>
   
    <div className='flex flex-row gap-4'>
        <button onClick={handleLanguageChange} >{language === 'en' ? 'En' : 'Kn'}</button>
      </div>
   
    </>
  );
};

export default LanguageToggle;
