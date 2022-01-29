import { Card } from './Card';
import { shuffle } from './helper/shuffle';
import { GameModeConfig } from './GameModeConfig';

export class Scrambler {
  static CreatePairs<T>(gameMode: GameModeConfig<T>, numberOfCards: number): Card<T>[] {
    const availableCards: Card<T>[] = gameMode.getAllAvailableCards();

    const shuffledCards = shuffle(availableCards);
    const pairs: Card<T>[] = [];

    while (pairs.length < numberOfCards && shuffledCards.length > 0) {
      pairs.push(shuffledCards[0]);
      pairs.push(shuffledCards[0].clone());
      shuffledCards.shift();
    }

    return shuffle(pairs);
  }
}
