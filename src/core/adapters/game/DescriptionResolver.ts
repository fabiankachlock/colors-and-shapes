export interface DisplayCardDescriptionResolver<T> {
  resolveFront(config: T): string;
  resolveBack(config: T): string;
}
