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
      openCard: undefined as DisplayCard | undefined,
      secondOpenCard: undefined as DisplayCard | undefined,
      timeOut: undefined as number | undefined
    };
  },

  actions: {
    startGame() {
      const config = useConfig();
      const newCards = CreatePairs(config.colors, config.shapes, config.numberOfCards);
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.$patch({
        cards: newCards.map(c => ({
          ...c,
          isOpen: false
        })),
        openCard: undefined,
        secondOpenCard: undefined,
        timeOut: undefined
      });
    },
    updateOpenCards() {
      if (this.openCard && this.secondOpenCard) {
        const fits = Card.equals(this.openCard, this.secondOpenCard);
        if (!fits) {
          this.setCardOpen(this.secondOpenCard.id, false);
          this.setCardOpen(this.openCard.id, false);
        }
        this.secondOpenCard = undefined;
        this.openCard = undefined;
        if (this.timeOut) {
          clearTimeout(this.timeOut);
          this.timeOut = undefined;
        }
      }
    },
    clickedCard(card: DisplayCard) {
      this.setCardOpen(card.id, true);
      if (this.openCard && this.secondOpenCard) {
        this.updateOpenCards();
      }
      if (this.openCard && !this.secondOpenCard) {
        this.secondOpenCard = card;
        this.timeOut = setTimeout(() => {
          if (this.timeOut) {
            this.updateOpenCards();
          }
          this.timeOut = undefined;
        }, 2000) as unknown as number;
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
