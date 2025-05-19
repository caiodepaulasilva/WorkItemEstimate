import { CardStrategy } from './card-strategy';

export class TshirtStrategy implements CardStrategy {
  getCards(): string[] {
    return ['PP', 'P', 'M', 'G', 'GG', '?', '☕'];
  }

  getName(): string {
    return 'Tamanhos de Camiseta';
  }
}
