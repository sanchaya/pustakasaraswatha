import React from 'react';
import Link from 'next/link';

import {
    UserButton,
    useUser,
    SignInButton,
  } from "@clerk/nextjs";

export default function Header(){

    const { user } = useUser();

    return(
        <>
        <div className="bg-gray-100 flex flex-row shadow-lg py-2 justify-end w-full sm:w-auto ml-2">
 
           
            {user ? (
                <>
                     <div className='mr-5'>
                        <Link href="/">Home</Link>
                    </div>
                    <div className='mr-5'>
                        <Link href="/dashboard">Dashboard</Link>
                    </div>
                    <div className='mr-5'>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                  
                </>
            ) : (
                <>
                    <div className='mr-5'>
                    <button className={"bg-sky-800 text-white p-3 rounded-2xl "} >
                    <SignInButton redirectUrl='/register'/>
                    </button>
                    </div>
                </>
            )}
            </div>
       
        </>
    )
}