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
        // check if cards are a valid pair
        const fits = Card.equals(this.openCard, this.secondOpenCard) && this.openCard.id !== this.secondOpenCard.id;
        if (!fits) {
          // close them, when they aren't
          this.setCardOpen(this.secondOpenCard.id, false);
          this.setCardOpen(this.openCard.id, false);
        }
        // reset variables
        this.secondOpenCard = undefined;
        this.openCard = undefined;
        // clear timeout
        if (this.timeOut) {
          clearTimeout(this.timeOut);
          this.timeOut = undefined;
        }
      }
    },
    clickedCard(card: DisplayCard) {
      if (card.id === this.openCard?.id || card.id === this.secondOpenCard?.id || card.isOpen) return;

      // turn card to open side
      this.setCardOpen(card.id, true);
      if (this.openCard && this.secondOpenCard) {
        // hide open cards if needed
        this.updateOpenCards();
      }
      if (this.openCard && !this.secondOpenCard) {
        // second card selected
        this.secondOpenCard = card;
        // init timeout for automatically closing the cards
        const config = useConfig();
        this.timeOut = setTimeout(() => {
          // check, if the timeout has already been cleared
          if (this.timeOut) {
            this.updateOpenCards();
          }
          // reset timeout
          this.timeOut = undefined;
        }, config.cardTimeout) as unknown as number;
      } else if (!this.openCard && !this.secondOpenCard) {
        // first card selected
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
