import { Card } from '@/core/business/Card';
import { GameModeConfig } from '@/core/business/GameModeConfig';
import { Clothing } from './Clothes';
import { ClothingCard, ClothingCardConfig } from './ClothingCard';

export class ClothesGameMode implements GameModeConfig<ClothingCardConfig> {
  public getAllAvailableCards(): Card<ClothingCardConfig>[] {
    let cards: ClothingCard[] = [];
    for (const clothing of Object.values(Clothing)) {
      cards.push(new ClothingCard({ part: clothing as Clothing }));
    }
    return cards;
  }
}
