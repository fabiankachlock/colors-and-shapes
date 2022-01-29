import { Card } from './Card';

export interface GameModeConfig<ConfigType> {
  getAllAvailableCards(): Card<ConfigType>[];
}
