import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardStrategy } from '../../models/card-strategy';
import { FibonacciStrategy } from '../../models/fibonacci-strategy';
import { TshirtStrategy } from '../../models/tshirt-strategy';
import { NumericStrategy } from '../../models/numeric-strategy';
import { SignalRService } from './signalr.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardService {
  private currentStrategy: CardStrategy;
  private availableStrategies: Map<string, CardStrategy> = new Map();

  private _receivedCard = new BehaviorSubject<{ user: string, card: string } | null>(null);
  public receivedCard$ = this._receivedCard.asObservable();

  constructor(private http: HttpClient, private signalRService: SignalRService) {

    this.setupSignalRListeners();

    this.availableStrategies.set('fibonacci', new FibonacciStrategy());
    this.availableStrategies.set('tshirt', new TshirtStrategy());
    this.availableStrategies.set('numeric', new NumericStrategy());
    
    this.currentStrategy = this.availableStrategies.get('fibonacci')!;
  }

  private setupSignalRListeners() {
    this.signalRService.onReceiveMessage((user, card) => {
      this._receivedCard.next({ user, card });
    });
  }

  async selectCard(roomId: string, user: string, card: string): Promise<void> {
    await this.signalRService.submitVote(roomId, user, card);
  }

  setCurrentStrategy(strategyKey: string): void {
    const strategy = this.availableStrategies.get(strategyKey);
    if (strategy) {
      this.currentStrategy = strategy;
    }
  }

  getCurrentCards(): string[] {
    return this.currentStrategy.getCards();
  }

  getAvailableStrategies(): { key: string, name: string }[] {
    return Array.from(this.availableStrategies.entries()).map(([key, strategy]) => ({
      key,
      name: strategy.getName()
    }));
  }

  getCardsForRoom(roomId: string) {
    return this.http.get<string[]>(`/api/game/rooms/${roomId}/cards`);
  }
}
