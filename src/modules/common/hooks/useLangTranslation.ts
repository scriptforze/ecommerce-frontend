import { useTranslation } from "react-i18next";

export const useLangTranslation = () => {
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();

  return {
    lang,
    translate: (key: string) => t(key) as string,
  };
};
