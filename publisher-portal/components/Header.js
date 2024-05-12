import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    UserButton,
    useUser,
    SignInButton,
  } from "@clerk/nextjs";
import Translation from '../components/Translation';
import LanguageToggle from '../components/LanguageToggle';

export default function Header({language}){
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useUser();
    const [selectedLanguage,setLanguage]=useState('en');

    const handleLanguageChange = (selectedLanguage) => {
      setLanguage(selectedLanguage);
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
                    {/* <LanguageToggle onChange={handleLanguageChange} /> */}
                    </div>
                    <div className='flex flex-row gap-4 p-2'>
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/Publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publisher" /></Link>
                <Link href={`/About/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/dashboard/${language}`} className="no-underline text-black"><Translation language={language} textKey="dashboard" /></Link>
                <Link href={`/Contact/${language}`} className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                <div className='mr-4'><UserButton userProfileMode="navigation"  userProfileUrl={`/profile/${language}`}  afterSignOutUrl="/" /> </div>
                
                </div>
            </div>
                    
                {/* Mobile Menu Links */}
            
            <nav className={showMenu ? "flex flex-col gap-3 shadow-lg py-2 justify-center p-2 items-center w-full sm:hidden" : "hidden"}>
              
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/Publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publisher" /></Link>
                <Link href={`/About/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/dashboard/${language}`} className="no-underline text-black"><Translation language={language} textKey="dashboard" /></Link>
                <Link href={`/Contact/${language}`}  className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                <UserButton userProfileMode="navigation"  userProfileUrl={`/profile/${language}`}  afterSignOutUrl="/" />
               
            </nav>
                
                   
                </>
            ) : (
                <>
             <nav className={showMenu ? "flex flex-col gap-3 shadow-lg py-2 justify-center items-center w-full sm:hidden" : "hidden"}>
                
             {/* <div className='flex justify-end p-4'> */}
            < div className='flex flex-col gap-4 p-2 items-center'>
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/Publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publisher" /></Link>
                <Link href={`/About/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/Contact/${language}`}  className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                    <button  >
                    <SignInButton  redirectUrl='/isPublisher'/>
                    </button>
                    </div>
              
            </nav>
                <div className={`hidden sm:flex flex-row gap-4 shadow-lg py-2 justify-between items-center w-full sm:w-auto ml-2`}>
                <div className='ml-4'>
                <Link href={`/${language}`} className="no-underline text-black">
                    <Image src="/sanchaya.jpg" alt="sanchaya" width={85} height={40}/>
                </Link>
                {/* <LanguageToggle onChange={handleLanguageChange} /> */}
                </div>
                <div className='flex flex-row gap-4 p-2 items-center'>
                <Link href={`/${language}`} className="no-underline text-black"><Translation language={language} textKey="home" /></Link>
                <Link href={`/Publishers/${language}`} className="no-underline text-black"><Translation language={language} textKey="publisher" /></Link>
                <Link href={`/About/${language}`} className="no-underline text-black"><Translation language={language} textKey="about" /></Link>
                <Link href={`/Contact/${language}`}  className="no-underline text-black"><Translation language={language} textKey="contact_us" /></Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                    <div className='mr-4'>
                    <button  >
                    <SignInButton  redirectUrl={`/isPublisher/${language}`}/>
                    </button>
                    </div>
                    </div>
                 </div>
                </>
            )}
           
       
        </>
    )
}