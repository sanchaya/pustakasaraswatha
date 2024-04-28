
import en from './translation/en.json';
import kn from './translation/kn.json';

const translations = {
  en,
  kn,
};

const Translation = ({ language, textKey }) => {
  const translation = translations[language][textKey] || '';
  return <>{translation}</>;
};

export default Translation;
