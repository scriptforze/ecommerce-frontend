import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es } from "./languages";

export const i18n = i18next.use(initReactI18next).init({
  fallbackLng: "es",
  resources: {
    en,
    es,
  },
});
