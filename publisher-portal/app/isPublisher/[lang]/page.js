"use client"

import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useUser,useClerk } from '@clerk/nextjs';
import {useRouter} from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
export default function IsPublisher(req,res){
    const router = useRouter();
    const { user } = useUser();
    const { signOut } = useClerk();
    const [userId, setUserId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const language= req.params.lang;
    useEffect(() => {
        if (user) {
          setUserId(user.id);
          console.log("User ID:", user.id);
        }
      }, [user, userId]);
  
const handleLogout = async()=>{
  await signOut();
  router.push(`/${language}`);
}

const handleRegister=()=>{
  router.push(`/register/${language}`);
}

  

    useEffect(() => {
      setIsOpen(true); // Open the alert dialog when the component mounts
  }, []);

    return(
        <>
<AlertDialog open={isOpen} onClose={() => setIsOpen(false)}>
  <AlertDialogTrigger/>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you a Publisher?</AlertDialogTitle>
      <AlertDialogDescription>
        Only Publishers can SignIn!!!
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={handleLogout} >Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleRegister}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        </>
    )
}