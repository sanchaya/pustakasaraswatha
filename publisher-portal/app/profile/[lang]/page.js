"use client"
import React ,{useState} from 'react';
import Header from "@/components/Header";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import Translation from '@/components/Translation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Form,
    FormControl, 
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent,  CardHeader, CardTitle} from "@/components/ui/card";
import axios from "axios";
import {useUser} from "@clerk/nextjs";
import {useEffect} from "react";
import { useLanguage } from '@/contexts/LanguageContext';
const formSchema = z.object({

    name: z.string().min(1, {
        message: 'Name is required',
    }),
    email: z.string().min(1, "Email is Required"),
    weburl: z.string().min(1, "Required"),

    phone: z.string().refine(data => {
        const strData = String(data); // Convert to string
        return strData.length === 10 ;
    },{
        message: "Number must be 10 digits",
    }),
    address:z.string().min(1, "Address is Required"),
    
});

const processFile = (file) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      return { isValid: false, message: 'Invalid file type. Please select an image file.' };
    }
    
    // Check if the file size is less than 100 KB
    const maxSizeInKB = 100;
    const fileSizeInBytes = file.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
    if (fileSizeInKB > maxSizeInKB) {
      return { isValid: false, message: 'File size exceeds the maximum limit of 100 KB.' };
    }
    
    // If the file passes both checks, return isValid true
    return { isValid: true, message: '' };
  };
  
  
  
 const UserDashboard = (req,res) => {
    const { language } = useLanguage();
    const [url,setUrl]=useState("");
    const[error,setError]=useState("");
    const {user} = useUser();
    const[fileData, setFileData]=useState();
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange', // Enable onChange mode for live form validation
    });
    const isLoading = form.formState.isSubmitting;

    const fetchData = async () => {
        try {
          
          const response = await fetch(
            `https://pubserver.sanchaya.net/profile/${user.emailAddresses[0]}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const responseData = await response.json();
          console.log(responseData);
       
         // Check if userProfile exists in responseData
         if (responseData) {
            const userProfileData = responseData.user;
            const publisherLogoData = responseData.userWithLogo;
            // Set default values for form fields
            console.log(publisherLogoData.logo);
            form.setValue("name", userProfileData.name);
            form.setValue("email", userProfileData.email);
            form.setValue("phone", userProfileData.phone);
            form.setValue("weburl", userProfileData.weburl);
            form.setValue("address",userProfileData.address);
            form.setValue("role",userProfileData.role);
            setUrl(publisherLogoData.logo);
        }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
      
      useEffect(()=>{

        if(user){
            fetchData();
        }
    },[user]);

 

    const onSubmit = async (values) => {
        try {
            // Check if there are no form errors
            // const isValid = await form.trigger();
            // console.log(isValid);
            // if (!isValid) {
            //     console.error('Form validation failed. Please check the errors.');
            //     return;
            // }
    
            // Convert the logo image to base64 format
            if (fileData) {
                const logoBase64 = await convertToBase64(fileData);
                // Update the form values with the base64 encoded logo
                values = { ...values, logo: logoBase64 };
                console.log(logoBase64);
            }
           
    
            // Send the form data to the backend API
            const requestData = { ...values }; // Create a new object without circular references
            await axios.put(`https://pubserver.sanchaya.net/users/update/${user.emailAddresses[0]}`, requestData);
    
            console.log('Form data sent successfully to the backend.');
            localStorage.setItem('userRole', values.role);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    function convertToBase64(file){
        return new Promise((resolve, reject)=>{
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = ()=>{
            resolve(fileReader.result)
          };
          fileReader.onerror =(error)=>{
            reject(error)
          }
        })

      }

   

    return(
        <>
     <Header />
    <Card className="w-fit  mx-auto mt-20 text-white bg-sky-900">
    <CardHeader>
        <CardTitle className='mx-auto'>{user && user.firstName}'s Profile</CardTitle>
       
    </CardHeader>
    <CardContent className='mt-6 text-lg text-white'>
        <div className="flex justify-center mb-6">
            <Avatar className="w-60 h-60">
                <AvatarImage src={url} />
                <AvatarFallback>Profile</AvatarFallback>
            </Avatar>

        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid w-full items-center gap-4 grid-cols-2 text-black">
                {/* <FormField
                    disabled={isLoading}
                    name={"role"} 
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Role:</FormLabel>
                            <FormControl>
                                <Select 
                                    
                                    placeholder="Select your Role"
                                    {...field}
                                >
                                    <option value="author">Author</option> 
                                    <option value="publisher">Publisher</option> 
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                /> */}

                    <FormField
                        disabled={isLoading}
                        name={"name"}
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel><Translation language={language} textKey="name" />:</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Enter your Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                        }/>
                    <FormField
                        disabled={isLoading}
                        name={"email"}
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel><Translation language={language} textKey="email" />:</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                        }/>
                    <FormField
                        disabled={isLoading}
                        name={"weburl"}
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel><Translation language={language} textKey="web_address" />:</FormLabel>
                              
                                    <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Enter your webAddress"
                                        {...field}
                                    />
                                    </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )
                        }/>
              
               
                    <FormField
                        disabled={isLoading}
                        name={"phone"}
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel><Translation language={language} textKey="contact_no" />:</FormLabel>
                                <FormControl>
                                    <Input
                                       
                                        disabled={isLoading}
                                        placeholder="Enter your Phone Number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                        }/>
                
             
                    <FormField
                    disabled={isLoading}
                    name={"address"}
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel><Translation language={language} textKey="home_address" />: </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your home address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                    }/>
                      <FormField
                    disabled={isLoading}
                    name={"logo"}
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel><Translation language={language} textKey="logo" />:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Update your logo"
                                    type="file"
                                    {...field}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        // Validate the file
                                         const { isValid, message } = processFile(file);
                                        if (!isValid) {
                                        setError(message);
                                     
                                        } 
                                        else {
                                        setFileData(file);
                                        setError("");
             
                                         }
                                      }}
                                />
                            </FormControl>
                           
                         <FormMessage type="error">{error}</FormMessage>
                           
                        </FormItem>
                    )
                    }/>
                </div>
          
                <div className="flex flex-col space-y-1.5 pt-2">
                    <Button>Update</Button>
                </div>
            </form>
        </Form>
    </CardContent>

</Card>

</>
);
}

export default UserDashboard;