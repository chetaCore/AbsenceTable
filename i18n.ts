import i18n, { InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import localesEN from './locales/common.en.json';
import localesRU from './locales/common.ru.json';

const resources = {
  en: {
    translation: localesEN,
  },
  ru: {
    translation: localesRU,
  },
};

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'en-US', 'ru-RU'],
    initImmediate: false,
  } as InitOptions);

export default i18nInstance;