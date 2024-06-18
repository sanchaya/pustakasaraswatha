import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return (
        <>
         <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center">
            <SignIn signUpForceRedirectUrl={"/isPublisher/en"} signUpFallbackRedirectUrl="/"/>
            </div>
        </div>
      
        
        </>
    
    );
}