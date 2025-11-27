import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import kk from "./locales/kk.json";
import ru from "./locales/ru.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      kk: { translation: kk },
    },
    fallbackLng: "ru",
    supportedLngs: ["en", "ru", "kk"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

const setHtmlLang = (lng?: string) => {
  if (typeof document === "undefined" || !lng) return;
  document.documentElement.lang = lng;
};

setHtmlLang(i18n.language);
i18n.on("languageChanged", setHtmlLang);

export default i18n;

