"use client"
import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
//   const changeLanguage = (lang: string) => {
//     setLanguage(lang);
//     // Manually construct the new URL path based on the current path
//     console.log(pathname);
//     const newPath = `/${pathname}/${lang}`;
//     router.push(newPath);
//   };
const changeLanguage = (lang: string) => {
    setLanguage(lang);

    // Split the current pathname into segments
    const segments = pathname.split('/').filter(Boolean);

    // Determine the new path
    let newPath = '';
    if (segments.length === 0) {
      // Handle the main page
      newPath = `/${lang}`;
    } else {
      // Handle other pages
      console.log(segments);
      segments[segments.length - 1] = lang; // Replace the last segment with the new language
      newPath = `/${segments.join('/')}`;
    }

    // Append any search parameters if they exist
    const queryString = searchParams.toString();
    if (queryString) {
      newPath += `?${queryString}`;
    }

    router.push(newPath);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
