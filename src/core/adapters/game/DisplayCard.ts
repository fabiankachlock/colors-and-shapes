import { Card } from '@/core/business/Card';
import { GameMode } from '../config';
import { DisplayCardDescriptionResolver } from './DescriptionResolver';
import { DescriptionResolverMap } from './DescriptionResolverMap';

export class DisplayCard<T> {
  constructor(
    public readonly card: Card<T>,
    public isOpen: boolean,
    private readonly resolver: DisplayCardDescriptionResolver<T>
  ) {}

  public getFrontDescriptor(): string {
    return this.resolver.resolveFront(this.card.config);
  }

  public getBackDescriptor(): string {
    return this.resolver.resolveBack(this.card.config);
  }

  get id(): string {
    return this.card.id;
  }

  get config(): T {
    return this.card.config;
  }
}
