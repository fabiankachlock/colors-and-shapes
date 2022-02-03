import { useConfig } from '@/core/adapters/config';
import { Card } from '@/core/business/Card';
import { GameModeConfig } from '@/core/business/GameModeConfig';
import { Color } from './Colors';
import { ColorCardConfig, ColorsCard } from './ColorsCard';
import { Shape } from './Shapes';

export class ColorsGameMode implements GameModeConfig<ColorCardConfig> {
  public getAllAvailableCards(): Card<ColorCardConfig>[] {
    let cards: ColorsCard[] = [];
    const config = useConfig();
    for (const color of Object.values(config.colors)) {
      for (const shape of Object.values(config.shapes)) {
        cards.push(new ColorsCard({ color: color as Color, shape: shape as Shape }));
      }
    }
    return cards;
  }
}
