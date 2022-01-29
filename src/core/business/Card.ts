import { v4 as uuid } from 'uuid';

export abstract class Card<ConfigType> {
  constructor(public readonly config: ConfigType, public readonly id = uuid()) {}

  abstract equals(card: Card<ConfigType>): boolean;

  abstract clone(): Card<ConfigType>;
}
