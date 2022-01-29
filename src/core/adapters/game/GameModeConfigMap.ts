import { GameModeConfig } from '@/core/business/GameModeConfig';
import { ColorGameMode } from '@/core/use-cases/colors/ColorsGameMode';
import { GameMode } from '../config';

export const GameModesMap: Record<GameMode, GameModeConfig<unknown>> = {
  [GameMode.colors]: new ColorGameMode(),
  [GameMode.clothes]: { getAllAvailableCards: () => [] }
};
