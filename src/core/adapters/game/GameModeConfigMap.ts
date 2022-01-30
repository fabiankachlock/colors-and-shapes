import { GameModeConfig } from '@/core/business/GameModeConfig';
import { ClothesGameMode } from '@/core/use-cases/clothes/ClothesGameMode';
import { ColorsGameMode } from '@/core/use-cases/colors/ColorsGameMode';
import { GameMode } from '../config';

export const GameModesMap: Record<GameMode, GameModeConfig<unknown>> = {
  [GameMode.colors]: new ColorsGameMode(),
  [GameMode.clothes]: new ClothesGameMode()
};
