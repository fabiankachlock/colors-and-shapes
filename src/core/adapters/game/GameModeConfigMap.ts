import { GameModeConfig } from '@/core/business/GameModeConfig';
import { ColorsGameMode } from '@/core/use-cases/colors/ColorsGameMode';
import { GameMode } from '../config';

export const GameModesMap: Record<GameMode, GameModeConfig<unknown>> = {
  [GameMode.colors]: new ColorsGameMode(),
  [GameMode.clothes]: { getAllAvailableCards: () => [] }
};
