import { CardStrategy } from './card-strategy';

export class NumericStrategy implements CardStrategy {
  getCards(): string[] {
    return Array.from({ length: 21 }, (_, i) => i.toString())
      .concat(['?', '☕']);
  }

  getName(): string {
    return 'Numérico (0-20)';
  }
}
