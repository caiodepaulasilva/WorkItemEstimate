import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LobbyComponent {
  lobbyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roomService: RoomService
  ) {    
    this.lobbyForm = this.fb.group({
      roomId: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  joinRoom() {
    if (this.lobbyForm.valid) {
      const { roomId, username } = this.lobbyForm.value;

      this.roomService.setCurrentRoom(roomId, username);

      this.router.navigate(['/voting']);

      this.lobbyForm.reset();
    }
  }
}
