import { Component } from '@angular/core';
import { SignalRService } from '../../services/signalr.service';

@Component({
  selector: 'app-room',
  template: `
    <div>
      <h2>Sala: {{ roomId }}</h2>
      <button (click)="submitVote('5')">Votar 5</button>
    </div>
  `,
  styles: [`
    div { padding: 20px; }
    button { margin-top: 10px; }
  `]
})
export class RoomComponent {
  roomId = 'teste-room';
  isLoading = true;

  constructor(private signalrService: SignalRService) {
    this.initializeConnection();
  }

  async initializeConnection(): Promise<void> {
    try {
      await this.signalrService.startConnection(this.roomId);
      this.isLoading = false;
    } catch (err) {
      console.error('Failed to initialize connection:', err);      
    }
  }

  async submitVote(vote: string): Promise<void> {
    try {
      await this.signalrService.submitVote(this.roomId, 'UsuárioTeste', vote);
    } catch (err) {
      console.error('Vote failed:', err);      
    }
  }
}
