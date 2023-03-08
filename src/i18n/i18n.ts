import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { tagsEs } from "./es/tags";
import { tagsEn } from "./en/tags";
import { menuEs } from "./es/menu";
import { menuEn } from "./en/menu";

export const i18n = i18next.use(initReactI18next).init({
  fallbackLng: "es",
  resources: {
    en: {
      translation: {
        tags: tagsEn,
        menu: menuEn,
      },
    },
    es: {
      translation: {
        tags: tagsEs,
        menu: menuEs,
      },
    },
  },
});
