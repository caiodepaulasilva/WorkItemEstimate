import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { CardSelectorComponent } from '../card-selector/card-selector.component';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [CommonModule, CardSelectorComponent],
  template: `
    <div class="voting-container">
      <div class="room-info" *ngIf="roomService.currentRoom$ | async as room">
        <h2>Sala: {{ room.id }}</h2>
        <p>Usuário: {{ room.user }}</p>
      </div>

      <div class="cards-section">
        <app-card-selector></app-card-selector>
      </div>
    </div>
  `,
  styles: [`
    .voting-container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .room-info { background: #fcfcfc; padding: 1rem; border-radius: 8px; }
    .cards-section { margin-top: 2rem; }
  `]
})
export class VotingComponent {
  constructor(public roomService: RoomService) { }
}
