import { Color } from './Colors';
import { Shape } from './Shape';
import { v4 as uuid } from 'uuid';

export class Card {
  constructor(public readonly color: Color, public readonly shape: Shape, public readonly id = uuid()) {}

  static equals(c1: Card, c2: Card): boolean {
    return c1.shape === c2.shape && c1.color === c2.color;
  }
}
