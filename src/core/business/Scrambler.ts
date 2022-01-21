import { Card } from './Card';
import { Color } from './Colors';
import { shuffle } from './helper/shuffle';
import { Shape } from './Shape';

export function CreatePairs(allowedColors: Color[], allowedShapes: Shape[], numberOfCards: number): Card[] {
  const availableCards: Card[] = [];

  for (const color of allowedColors) {
    for (const shape of allowedShapes) {
      availableCards.push(new Card(color, shape));
    }
  }

  const shuffledCards = shuffle(availableCards);
  const pairs: Card[] = [];

  while (pairs.length < numberOfCards && shuffledCards.length > 0) {
    pairs.push(shuffledCards[0]);
    pairs.push(new Card(shuffledCards[0].color, shuffledCards[0].shape));
    shuffledCards.shift();
  }

  return shuffle(pairs);
}
