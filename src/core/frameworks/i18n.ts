import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

export const supportedLanguages = ['en', 'de', 'ru'];
export const defaultLanguage = 'en';

const _i18n = createI18n({
  legacy: false,
  globalInjection: false,
  supportedLanguages: supportedLanguages,
  locale: 'en',
  fallbackLocale: 'en'
});

export const setI18nLanguage = (locale: string): void => {
  _i18n.global.locale.value = locale;

  if (!_i18n.global.availableLocales.includes(locale)) {
    loadLocaleMessages(locale);
  }

  document.querySelector('html')?.setAttribute('lang', locale);
};

export const loadLocaleMessages = async (locale: string): Promise<void> => {
  const messages = await import(/* webpackChunkName: "locale-[request]" */ `../../locales/${locale}.json`);

  _i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
};

// intial setup
loadLocaleMessages('en');
setI18nLanguage(defaultLanguage);

export default _i18n;
