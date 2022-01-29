import { ColorCardConfig } from '@/core/use-cases/colors/ColorsCard';
import { DisplayCardDescriptionResolver } from '../DescriptionResolver';
import { ColorCSSMap } from './ColorsCSSMap';
import { ShapeCSSMap } from './ShapesCSSMap';

export class ColorsCardDescriptionResolver implements DisplayCardDescriptionResolver<ColorCardConfig> {
  resolveFront(): string {
    return '';
  }
  resolveBack(config: ColorCardConfig): string {
    return `${ColorCSSMap[config.color]} ${ShapeCSSMap[config.shape]}`;
  }
}
