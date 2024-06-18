"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    UserButton,
    useUser,
    SignOutButton,
    SignInButton,
    SignIn,
   useClerk
  } from "@clerk/nextjs";

import Translation from '@/components/Translation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header(){
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useUser();
    const { signOut } = useClerk();
    const [selectedLanguage,setLanguage]=useState('en');
    const { language } = useLanguage();
    const router = useRouter();
    const handleLanguageChange = (selectedLanguage) => {
      setLanguage(selectedLanguage);
    };
    const handleSignInClick = () => {
        router.push('/sign-in');
    };
    const handleSignOut = async() => {
        console.log('User signed out');
        router.push(`/${language}`);
        await signOut();
      };

    return(
        <>
       
        <div className='flex justify-end items-center mr-5'>
            {/* Mobile Menu */}
            <Link href={`/${language}`} className="block lg:hidden mr-auto ml-5 mt-1 p-4 no-underline text-black">
            <Image  src="/sanchaya.jpg" alt="sanchaya" width={85} height={40}/>
            </Link>
            <button onClick={() => setShowMenu(!showMenu)} className="block sm:hidden focus:outline-none">
           
                <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showMenu ?
                  
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      
                         :
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    }
                </svg>
            </button>
           
            </div>

            {user ? (
                <>
                 <div className={`hidden sm:flex flex-row gap-16 shadow-lg py-2 justify-between w-full sm:w-auto ml-2`}>
                    <div className='flex flex-row p-2 ml-4'>
                    <Link href={`/${language}`} className="no-underline text-black">
                    <Image src="/sanchaya.jpg" alt="sanchaya" width={85} height={40}/>
                    </Link>
           
                    </div>
                    <div className="flex">
                    <LanguageSwitcher />
                    </div>
         
                    <div className='flex flex-row gap-4 p-2'>
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publishers" /></Link>
                <Link href={`/authors/${language}`} className="no-underline text-black"><Translation language={language} textKey="authors" /></Link>
                <Link href={`/about/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/dashboard/${language}`} className="no-underline text-black"><Translation language={language} textKey="dashboard" /></Link>
                <Link href={`/contact/${language}`} className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                <Link href={`/profile/${language}`} className="no-underline text-black"><Translation language={language} textKey="my_profile" /></Link>
                <div className='mr-4'>
                    {/* <UserButton userProfileMode="navigation"  userProfileUrl={`/profile/${language}`} />  */}
                   
                        <button onClick={handleSignOut}>Sign out</button>
                    
                    </div>
                   
                </div>
            </div>
                    
                {/* Mobile Menu Links */}
            
            <nav className={showMenu ? "flex flex-col gap-3 shadow-lg py-2 justify-center p-2 items-center w-full sm:hidden" : "hidden"}>
            <div className="flex">
                <LanguageSwitcher />
            </div>
         
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publishers" /></Link>
                <Link href={`/authors/${language}`} className="no-underline text-black"><Translation language={language} textKey="authors" /></Link>
                <Link href={`/dashboard/${language}`} className="no-underline text-black"><Translation language={language} textKey="dashboard" /></Link>
                <Link href={`/about/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/contact/${language}`}  className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                <Link href={`/profile/${language}`} className="no-underline text-black"><Translation language={language} textKey="my_profile" /></Link>
                {/* <UserButton userProfileMode="navigation"  userProfileUrl={`/profile/${language}`} /> */}
                <button onClick={handleSignOut}>Sign out</button>
               
            </nav>
                
                   
                </>
            ) : (
                <>
             <nav className={showMenu ? "flex flex-col gap-3 shadow-lg py-2 justify-center items-center w-full sm:hidden" : "hidden"}>
             <div className="flex">
                <LanguageSwitcher />
            </div>
             {/* <div className='flex justify-end p-4'> */}
            < div className='flex flex-col gap-4 p-2 items-center'>
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publishers" /></Link>
                <Link href={`/authors/${language}`} className="no-underline text-black"><Translation language={language} textKey="authors" /></Link>
                <Link href={`/about/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/contact/${language}`}  className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                    {/* <button  >
                    <SignInButton path="/sign-in" signInForceRedirectUrl={`/isPublisher/${language}`}  />
                    </button> */}
                     <button onClick={handleSignInClick}>
                        Sign In
                    </button>
                    </div>
              
            </nav>
                <div className={`hidden sm:flex flex-row gap-4 shadow-lg py-2 justify-between items-center w-full sm:w-auto ml-2`}>
                <div className='ml-4'>
                <Link href={`/${language}`} className="no-underline text-black">
                    <Image src="/sanchaya.jpg" alt="sanchaya" width={85} height={40}/>
                </Link>
               
                </div>
                <div className="flex">
                <LanguageSwitcher />
                 </div>
                <div className='flex flex-row gap-4 p-2 items-center'>
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publishers" /></Link>
                <Link href={`/authors/${language}`} className="no-underline text-black"><Translation language={language} textKey="authors" /></Link>
                <Link href={`/about/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/contact/${language}`}  className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                    <div className='mr-4'>
                    <button onClick={handleSignInClick}>
                        Sign In
                    </button>
                    </div>
                    </div>
                 </div>
                </>
            )}
           
       
        </>
    )
}