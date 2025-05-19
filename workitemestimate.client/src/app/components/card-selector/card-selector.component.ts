import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../../services/card-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalRService } from '../../services/signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.css']
})
export class CardSelectorComponent implements OnInit {
  cards: string[] = [];
  strategies: { key: string, name: string }[] = [];
  selectedStrategy: string = 'fibonacci';
  selectedCard: string | null = null;
  
  currentUser = 'Usuário1';
  roomId = 'sala-padrao';

  receivedVote: { user: string, card: string } | null = null;
  private subs = new Subscription();

  constructor(private cardService: CardService, private signalRService: SignalRService) { }

  async  ngOnInit() {
    this.loadStrategies();
    this.loadCards();
    
    try {
      await this.signalRService.startConnection(this.roomId);
    } catch (error) {
      console.error('Erro na conexão:', error);      
    }

    
    this.subs.add(
      this.cardService.receivedCard$.subscribe(vote => {
        this.receivedVote = vote;
      })
    );
  }

  loadStrategies() {
    this.strategies = this.cardService.getAvailableStrategies();
  }

  loadCards() {
    this.cardService.setCurrentStrategy(this.selectedStrategy);
    this.cards = this.cardService.getCurrentCards();
  }

  onStrategyChange() {
    this.loadCards();
    this.selectedCard = null; 
  }

  async selectCard(card: string) {
    this.selectedCard = card;
    try {
      await this.cardService.selectCard(this.roomId, this.currentUser, card);
    } catch (error) {
      console.error('Erro ao enviar voto:', error);      
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
