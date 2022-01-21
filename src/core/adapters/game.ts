import { defineStore } from 'pinia';
import { Card } from '../business/Card';
import { CreatePairs } from '../business/Scrambler';

export type DisplayCard = Card & {
  isOpen: boolean;
};

export const useConfig = defineStore('config', {
  state: () => {
    return {
      cards: [] as DisplayCard[],
      openCard: undefined as DisplayCard | undefined
    };
  },

  actions: {
    startGame() {
      const newCards = CreatePairs([], [], 0); // TODO: use config values
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
