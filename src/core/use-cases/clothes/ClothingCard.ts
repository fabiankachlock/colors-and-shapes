import { Card } from '@/core/business/Card';
import { Clothing } from './Clothes';

export type ClothingCardConfig = {
  part: Clothing;
};

export class ClothingCard extends Card<ClothingCardConfig> {
  equals(card: Card<ClothingCardConfig>): boolean {
    return card.config.part === this.config.part;
  }

  clone(): Card<ClothingCardConfig> {
    return new ClothingCard({ ...this.config });
  }
}
