import { defineStore } from 'pinia';
import { Card } from '../business/Card';
import { Scrambler } from '../business/Scrambler';
import { useConfig } from './config';
import { DescriptionResolverMap } from './game/DescriptionResolverMap';
import { DisplayCard } from './game/DisplayCard';
import { GameModesMap } from './game/GameModeConfigMap';
import { useMessages } from './messages';

export const useGame = defineStore('game', {
  state: () => {
    return {
      cards: [] as DisplayCard<unknown>[],
      openCard: undefined as DisplayCard<unknown> | undefined,
      secondOpenCard: undefined as DisplayCard<unknown> | undefined,
      timeOut: undefined as number | undefined
    };
  },

  actions: {
    startGame() {
      const config = useConfig();
      const gameModeConfig = GameModesMap[config.gameMode];
      const newCards = Scrambler.CreatePairs(gameModeConfig, config.numberOfCards);
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }

      // @ts-ignore
      this.$patch({
        cards: newCards.map(c => new DisplayCard(c, false, DescriptionResolverMap[config.gameMode])),
        openCard: undefined,
        secondOpenCard: undefined,
        timeOut: undefined
      });
    },
    startGameIfNeeded() {
      if (this.cards.length === 0) {
        this.startGame();
      }
    },
    updateOpenCards() {
      if (this.openCard && this.secondOpenCard) {
        // check if cards are a valid pair
        const fits = this.openCard.card.equals(this.secondOpenCard.card) && this.openCard.id !== this.secondOpenCard.id;
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
    clickedCard(card: DisplayCard<unknown>) {
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
        // check if fits;
        const fits = this.openCard.card.equals(this.secondOpenCard.card) && this.openCard.id !== this.secondOpenCard.id;
        useMessages().emitMessage(fits ? 'game.fit' : 'game.noFit');

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
