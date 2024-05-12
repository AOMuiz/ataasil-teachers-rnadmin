import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "ra-language-english";
import { TranslationMessages } from "react-admin";
// import ar from "ra-language-arabic";

const translations: {
  en: TranslationMessages;
} = { en: en };

export const i18nProvider = polyglotI18nProvider(
  (locale) => {
    return translations[locale];
  },
  "ar", // default locale
  [
    { locale: "ar", name: "Arabic" },
    { locale: "en", name: "English" },
  ]
);
