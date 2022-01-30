import { ClothingCardConfig } from '@/core/use-cases/clothes/ClothingCard';
import { DisplayCardDescriptionResolver } from '../DescriptionResolver';
import { ClothingCSSMap } from './ClothesCSSMap';

export class ClothingCardDescriptionResolver implements DisplayCardDescriptionResolver<ClothingCardConfig> {
  resolveFront(): string {
    return '';
  }
  resolveBack(config: ClothingCardConfig): string {
    return `${ClothingCSSMap[config.part]} gm-d`;
  }
}
