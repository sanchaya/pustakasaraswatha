import React from 'react';
import Link from 'next/link';
export default function Header(){
    return(
        <>
        <div className='flex flex-row justify-center align-center gap-4 items-center px-4 py-2 w-100 bg-red-200'>
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
        </div>
        </>
    )
}