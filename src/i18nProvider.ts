import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "ra-language-english";
import { TranslationMessages } from "react-admin";

// Define the type for translations object
const translations: {
  [key: string]: TranslationMessages;
} = { en: en };

export const i18nProvider = polyglotI18nProvider(
  (locale: string) => {
    // Handle missing translations gracefully
    return translations[locale] || translations.en;
  },
  "en", // default locale
  [
    { locale: "ar", name: "Arabic" },
    { locale: "en", name: "English" },
  ]
);
