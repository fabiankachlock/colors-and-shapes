import { GameMode } from '../config';
import { DisplayCardDescriptionResolver } from './DescriptionResolver';
import { ColorsCardDescriptionResolver } from './colors/CardResolver';
import { ClothingCardDescriptionResolver } from './clothes/CardResolver';

export const DescriptionResolverMap: Record<GameMode, DisplayCardDescriptionResolver<unknown>> = {
  [GameMode.colors]: new ColorsCardDescriptionResolver(),
  [GameMode.clothes]: new ClothingCardDescriptionResolver()
};
