import { defaultLanguage, setI18nLanguage, supportedLanguages } from '@/core/frameworks/i18n';
import { defineStore } from 'pinia';

const languageKey = '__$lng';
const uiKey = '__$ui';

const changeLanguage = (lng: string) => {
  setI18nLanguage(lng);
  localStorage.setItem(languageKey, lng);
};

const changeUIMode = (isDark: boolean) => {
  localStorage.setItem(uiKey, isDark ? 'dark' : 'light');
  if (isDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

export const useConfig = defineStore('config', {
  state: () => {
    return {
      useDarkMode: false,
      language: 'en'
    };
  },

  actions: {
    setDarkMode(isEnabled: boolean) {
      this.useDarkMode = isEnabled;
      changeUIMode(isEnabled);
    },
    setLanguage(lng: string) {
      this.language = lng;
      changeLanguage(lng);
    },
    configure() {
      let language = '';
      const storedLng = localStorage.getItem(languageKey);
      const navigatorLng = navigator.language;
      if (storedLng) {
        language = storedLng;
      } else {
        language = navigatorLng in supportedLanguages ? navigatorLng : defaultLanguage;
      }
      setI18nLanguage(language);

      const rawStoredDarkMode = localStorage.getItem(uiKey);
      const storedDarkMode = rawStoredDarkMode
        ? rawStoredDarkMode === 'dark'
        : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      changeUIMode(storedDarkMode);

      this.$patch({
        useDarkMode: storedDarkMode,
        language: language
      });
    }
  }
});
