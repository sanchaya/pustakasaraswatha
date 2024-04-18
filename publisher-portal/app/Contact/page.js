"use client";

import React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from "next/link";
export default function Contact() {
    
    return(
        <>
        <div className='mb-20 '>
            <Header/>
        </div>

        <div className='flex justify-center items-center gap-4 mt-20'>
    
            <h4>
                Contact Us
            </h4>
            <h6>
         <Link href="https://sanchaya.org" className="underline"> https://sanchaya.org </Link> 
            <br/> <Link href="https://sanchaya.org/ಸಂಪರ್ಕಿಸಿ/" className="underline"> https://sanchaya.org/ಸಂಪರ್ಕಿಸಿ/</Link>

            </h6>
        </div>
        <div className="fixed bottom-0 mt-8"><Footer/>
      </div> 
        </>
    )
}