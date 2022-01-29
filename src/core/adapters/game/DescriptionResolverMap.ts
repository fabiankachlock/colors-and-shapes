import { GameMode } from '../config';
import { DisplayCardDescriptionResolver } from './DescriptionResolver';
import { ColorsCardDescriptionResolver } from './colors/CardResolver';

export const DescriptionResolverMap: Record<GameMode, DisplayCardDescriptionResolver<unknown>> = {
  [GameMode.colors]: new ColorsCardDescriptionResolver(),
  [GameMode.clothes]: {
    resolveBack: () => '',
    resolveFront: () => ''
  }
};
