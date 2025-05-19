import { CardStrategy } from './card-strategy';

export class FibonacciStrategy implements CardStrategy {
  getCards(): string[] {
    return ['1', '2', '3', '5', '8', '13', '21', '34', '?', '☕'];
  }

  getName(): string {
    return 'Fibonacci';
  }
}
