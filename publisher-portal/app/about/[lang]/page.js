"use client";

import React from "react";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
export default function About(req,res) {
    const { language } = useLanguage();
    return(
        <>
        <Header  />
      
      
        <div className='flex flex-col justify-center items-center '>    
        <h1 className='mb-10 mt-10'>ನಮ್ಮ ಬಗ್ಗೆ </h1>
        <div className="kannada-text-container">
       <p>ಕನ್ನಡ ಭಾಷಾ ತಂತ್ರಜ್ಞಾನ ಸಂ‍ಶೋಧನೆ ಹಾಗೂ ಅಧ್ಯಯನ ವೇದಿಕೆ‍‍‍
‘ಸಂಚಯ’ ವಾಣಿಜ್ಯ ಆಸಕ್ತಿ ಅಥವಾ ಲಾಭದ ಉದ್ದೇಶವಿಲ್ಲದೆ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಸಂಶೋಧನೆಯ ತಾಂತ್ರಿಕ ಸಾಮರ್ಥ್ಯವನ್ನು ವರ್ಧಿಸುವುದಕ್ಕಾಗಿ ಕಾರ್ಯನಿರತವಾಗಿದೆ.‍</p> 
<p>ಕನ್ನಡ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ಕ್ಷೇತ್ರದಲ್ಲಿ ಕೆಲಸ ಮಾಡುವ ಉದ್ದೇಶದಿಂದ ಹುಟ್ಟಿಕೊಂಡದ್ದು ‘ಸಂಚಯ’. ತಂತ್ರಜ್ಞಾನವನ್ನು ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ಸಂಶೋಧನೆಗಳಿಗೆ ಬಳಸುವ ಸಾಧ್ಯತೆಯನ್ನು ‘ಸಂಚಯ’ ಶೋಧಿಸುತ್ತಿದೆ.</p>
<p>ಹೆಚ್ಚು ಜನರನ್ನು ಒಳಗೊಳ್ಳಲು ಸಾಧ್ಯವಿರುವ, ಹೆಚ್ಚು ಜನರು ಬಳಸುವ ಅವಕಾಶವನ್ನು ತೆರೆಯುವ ಅಂತರಜಾಲ ಮತ್ತು ಮೊಬೈಲ್ ವೇದಿಕೆಗಳಲ್ಲಿ ಸಂಚಯ ರೂಪಿಸಿರುವ ‘ವಚನ ಸಂಚಯ’ದಂತಹ ಪರಿಕರಗಳು ಲಭ್ಯವಿವೆ. </p> 
 <p>ಇದೇ ಬಗೆಯ ಇನ್ನಷ್ಟು ಕನಸುಗಳು ನಮ್ಮವು.
 ಸಾಹಿತ್ಯಿಕ ಮತ್ತು ತಾಂತ್ರಿಕ ಜ್ಞಾನಗಳನ್ನು ಬೆಸೆಯುವ ಯೋಜನೆಗಳೆಲ್ಲವೂ ಮುಕ್ತ ತಂತ್ರಾಂಶದ ಮೂಲಕ ಮುಕ್ತ ಮಾಹಿತಿ ಮತ್ತು ಮುಕ್ತ ಜ್ಞಾನದ ವಾತಾವರಣವೊಂದನ್ನು ರೂಪಿಸುವ ಆದರ್ಶವನ್ನು ಬುನಾದಿಯಾಗಿಟ್ಟುಕೊಂಡಿವೆ.</p>
        </div>
       </div>
    
       <div className="bottom-0 mt-8"><Footer/>
      </div> 
      
        </>
    )
}