import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import {
    SignInButton,
    UserButton,
    useClerk,
    useUser,
  } from "@clerk/nextjs";

export default function Header(){

    const { user } = useUser();
    const [userId, setUserId] = useState(null);
    const { signOut } = useClerk();

  
    useEffect(() => {
        if (user) {
          setUserId(user.id);
          console.log("User ID:", user.id);
        }
      }, [user, userId]);

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
                    <button className={"bg-sky-800 text-white p-3 rounded-2xl "}>
                        <SignInButton />
                    </button>
                    </div>
                </>
            )}
            </div>
       
        </>
    )
}