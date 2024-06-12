import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './translations/en.json';
import translationPT from './translations/pt.json';

// As traduções são adicionadas ao objeto de recursos
const resources = {
  en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  }
};

i18n
  .use(initReactI18next) // passa o i18n para react-i18next.
  .init({
    resources,
    lng: "pt", // Idioma inicial
    fallbackLng: "pt", // Caso o idioma não seja encontrado

    interpolation: {
      escapeValue: false // React já faz escaping de valores por padrão
    }
  });

export default i18n;
