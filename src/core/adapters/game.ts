import { defineStore } from 'pinia';
import { Card } from '../business/Card';
import { Color } from '../business/Colors';
import { CreatePairs } from '../business/Scrambler';
import { Shape } from '../business/Shapes';
import { useConfig } from './config';

export type DisplayCard = Card & {
  isOpen: boolean;
};

export const ColorMap: Record<Color, string> = {
  [Color.Red]: 'c-red',
  [Color.Green]: 'c-green',
  [Color.Blue]: 'c-blue',
  [Color.Yellow]: 'c-yellow',
  [Color.Black]: 'c-black',
  [Color.White]: 'c-white',
  [Color.Grey]: 'c-gray',
  [Color.Orange]: 'c-orange',
  [Color.Purple]: 'c-purple',
  [Color.Pink]: 'c-pink',
  [Color.Brown]: 'c-brown',
  [Color.SkyBlue]: 'c-sky-blue'
};

export const ShapeMap: Record<Shape, string> = {
  [Shape.Square]: 's-square',
  [Shape.Triangle]: 's-triangle',
  [Shape.Circle]: 's-circle'
};

export const useGame = defineStore('game', {
  state: () => {
    return {
      cards: [] as DisplayCard[],
      openCard: undefined as DisplayCard | undefined
    };
  },

  actions: {
    startGame() {
      const config = useConfig();
      const newCards = CreatePairs(config.colors, config.shapes, config.numberOfCards);
      this.$patch({
        cards: newCards.map(c => ({
          ...c,
          isOpen: false
        }))
      });
    },
    clickedCard(card: DisplayCard) {
      this.setCardOpen(card.id, true);
      if (this.openCard) {
        const fits = Card.equals(this.openCard, card);
        if (!fits) {
          this.setCardOpen(this.openCard!.id, false);
          this.setCardOpen(card.id, false);
        }
      } else {
        this.openCard = card;
      }
    },
    setCardOpen(id: string, open: boolean) {
      const newCards = [...this.cards];
      for (const index in newCards) {
        if (newCards[index].id === id) {
          newCards[index].isOpen = open;
        }
      }
    }
  }
});
