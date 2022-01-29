import { Card } from '@/core/business/Card';
import { Color } from './Colors';
import { Shape } from './Shapes';

export type ColorCardConfig = {
  color: Color;
  shape: Shape;
};

export class ColorsCard extends Card<ColorCardConfig> {
  equals(card: Card<ColorCardConfig>): boolean {
    return card.config.color === this.config.color && card.config.shape === this.config.shape;
  }

  clone(): Card<ColorCardConfig> {
    return new ColorsCard({ ...this.config });
  }
}
