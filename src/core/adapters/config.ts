import { defaultLanguage, setI18nLanguage, supportedLanguages } from '@/core/frameworks/i18n';
import { defineStore } from 'pinia';
import { Color } from '../business/Colors';
import { toggleElement } from '../business/helper/toggleArrayElement';
import { Shape } from '../business/Shapes';

const languageKey = '__$lng';
const uiKey = '__$ui';
const colorsKey = '__$colors';
const shapesKey = '__$shapes';
const cardAmountKey = '__$cardAmount';
const cardTimeoutKey = '__$cardTimeout';
const gameModeKey = '__$gameMode';

const DefaultColors = [...Object.values(Color)] as Color[];
const DefaultShapes = [...Object.values(Shape)] as Shape[];

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

export enum GameMode {
  colors = '@colors',
  clothes = '@clothes'
}

export const useConfig = defineStore('config', {
  state: () => {
    return {
      useDarkMode: false,
      language: 'en',
      shapes: DefaultShapes,
      colors: DefaultColors,
      numberOfCards: 30 as number,
      cardTimeout: 2000 as number,
      gameMode: GameMode.colors as GameMode
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
    setGameMode(mode: GameMode) {
      this.gameMode = mode;
      localStorage.setItem(gameModeKey, mode);
    },
    setCardAmount(amount: number) {
      this.numberOfCards = amount;
      localStorage.setItem(cardAmountKey, amount.toString());
    },
    setCardTimeout(timeout: number) {
      this.cardTimeout = timeout;
      localStorage.setItem(cardTimeoutKey, timeout.toString());
    },
    setColor(color: Color, enabled: boolean) {
      const newColors = toggleElement(this.colors, color, enabled);
      localStorage.setItem(colorsKey, JSON.stringify(newColors));
      this.$patch({
        colors: newColors
      });
    },
    setShape(shape: Shape, enabled: boolean) {
      const newShapes = toggleElement(this.shapes, shape, enabled);
      localStorage.setItem(shapesKey, JSON.stringify(newShapes));
      this.$patch({
        shapes: newShapes
      });
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

      const storedColors = localStorage.getItem(colorsKey);
      const storedShapes = localStorage.getItem(shapesKey);
      const storedAmount = localStorage.getItem(cardAmountKey);
      const storedTimeout = localStorage.getItem(cardTimeoutKey);
      const storedGameMode = localStorage.getItem(gameModeKey);

      this.$patch({
        useDarkMode: storedDarkMode,
        language: language,
        colors: (storedColors ? JSON.parse(storedColors) : undefined) ?? DefaultColors,
        shapes: (storedShapes ? JSON.parse(storedShapes) : undefined) ?? DefaultShapes,
        numberOfCards: parseInt(storedAmount ?? '30', 10) ?? 30,
        cardTimeout: parseInt(storedTimeout ?? '2000', 10) ?? 30,
        gameMode: (storedGameMode as GameMode) ?? GameMode.colors
      });
    }
  }
});
