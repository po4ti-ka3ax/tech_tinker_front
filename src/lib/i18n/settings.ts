// lib/i18n/settings.ts

export const defaultNS = 'common';

export const resources = {
  en: {
    common: () => import('../../../public/locales/en/common.json').then((m) => m.default),
  },
  ru: {
    common: () => import('../../../public/locales/ru/common.json').then((m) => m.default),
  },
  kk: {
    common: () => import('../../../public/locales/kk/common.json').then((m) => m.default),
  },
};

export const fallbackLng = 'en';

export const languages = ['en', 'ru', 'kk'];

export const i18nOptions = {
  supportedLngs: languages,
  fallbackLng,
  lng:"en",
  defaultNS,
  ns: ['common'],
  react: {
    useSuspense: false,
  },
};
