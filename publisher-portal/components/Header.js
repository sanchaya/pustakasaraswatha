import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    UserButton,
    useUser,
    SignInButton,
  } from "@clerk/nextjs";

export default function Header(){
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useUser();

    return(
        <>
       
        <div className='flex justify-end items-center mr-5'>
            {/* Mobile Menu */}
            <Image className="block lg:hidden mr-auto ml-5 mt-1 p-4" src="/sanchaya.jpg" alt="sanchaya" width={85} height={40}/>
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
                    <div className='p-4'>
                    <Image src="/sanchaya.jpg" alt="sanchaya" width={85} height={40}/>
                    </div>
                    <div className='flex flex-row gap-16 p-4'>
                <Link href={"/"} className="no-underline text-black">Home</Link>
                <Link href="/About" className="no-underline text-black">About Us</Link>
                <Link href="/dashboard" className="no-underline text-black">Dashboard</Link>
                <Link href="/Contact" className="no-underline text-black">Contact Us</Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                <UserButton afterSignOutUrl="/" />
                </div>
            </div>
                    
                {/* Mobile Menu Links */}
            
            <nav className={showMenu ? "flex flex-col gap-3 shadow-lg py-2 justify-center p-4 items-center w-full sm:hidden" : "hidden"}>
              
                <Link href="/" className="no-underline text-black">Home</Link>
                <Link href="/About" className="no-underline text-black">About Us</Link>
                <Link href="/dashboard" className="no-underline text-black">Dashboard</Link>
                <Link href="/Contact" className="no-underline text-black">Contact Us</Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                <UserButton afterSignOutUrl="/" />
               
            </nav>
                
                   
                </>
            ) : (
                <>
             <nav className={showMenu ? "flex flex-col gap-3 shadow-lg py-2 justify-center items-center w-full sm:hidden" : "hidden"}>
                
             <div className='flex justify-end p-4'>
                    <button className={"bg-sky-800 text-white p-3 rounded-2xl "} >
                    <SignInButton  redirectUrl='/isPublisher'/>
                    </button>
                    </div>
              
            </nav>
                <div className={`hidden sm:flex flex-row gap-16 shadow-lg py-2 justify-between items-center w-full sm:w-auto ml-2`}>
                <div>
                <Image src="/sanchaya.jpg" alt="sanchaya" width={85} height={40}/>
                </div>
                <div className='flex flex-row gap-16 p-4 items-center'>
                <Link href="/" className="no-underline text-black">Home</Link>
                <Link href="/About" className="no-underline text-black">About Us</Link>
                <Link href="/Contact" className="no-underline text-black">Contact Us</Link>
                <Link href="https://www.facebook.com/kannadasanchaya">
                    <Image src="/facebook.png" alt="facebook" width={35} height={30} />
                </Link>
                <Link href="https://twitter.com/kannadasanchaya">
                    <Image src="/twitter.webp" alt="twitter" width={45} height={40} />
                </Link>
                 
                    <button className={"bg-sky-800 text-white p-3 rounded-2xl "} >
                    <SignInButton  redirectUrl='/isPublisher'/>
                    </button>
                    </div>
                 </div>
                </>
            )}
           
       
        </>
    )
}