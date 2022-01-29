import { Shape } from '@/core/use-cases/colors/Shapes';

export const ShapeCSSMap: Record<Shape, string> = {
  [Shape.Square]: 's-square',
  [Shape.Triangle]: 's-triangle',
  [Shape.Circle]: 's-circle'
};
