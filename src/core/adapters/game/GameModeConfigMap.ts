import { GameModeConfig } from '@/core/business/GameMode';
import { ColorsGameMode } from '@/core/use-cases/colors/ColorsGameMode';
import { GameMode } from '../config';

export const GameModesMap: Record<GameMode, GameModeConfig<unknown>> = {
  [GameMode.colors]: new ColorsGameMode(),
  [GameMode.clothes]: { getAllAvailableCards: () => [] }
};
