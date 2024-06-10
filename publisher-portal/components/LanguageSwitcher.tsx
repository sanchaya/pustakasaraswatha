"use client"
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <button
        onClick={() => setLanguage('en')}
        disabled={language === 'en'}
        className="p-2 m-2  text-black rounded"
      >
        English
      </button>
      <button
        onClick={() => setLanguage('kn')}
        disabled={language === 'kn'}
        className="p-2 m-2 text-black rounded"
      >
        Kannada
      </button>
      {/* Add more languages as needed */}
    </div>
  );
};

export default LanguageSwitcher;
