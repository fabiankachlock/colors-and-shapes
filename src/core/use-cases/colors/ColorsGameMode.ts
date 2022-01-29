import { Card } from '@/core/business/Card';
import { GameModeConfig } from '@/core/business/GameModeConfig';
import { Color } from './Colors';
import { ColorCardConfig, ColorsCard } from './ColorsCard';
import { Shape } from './Shapes';

export class ColorGameMode implements GameModeConfig<ColorCardConfig> {
  public getAllAvailableCards(): Card<ColorCardConfig>[] {
    let cards: ColorsCard[] = [];
    for (const color of Object.values(Color)) {
      for (const shape of Object.values(Shape)) {
        cards.push(new ColorsCard({ color: color as Color, shape: shape as Shape }));
      }
    }
    return cards;
  }
}
