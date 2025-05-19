import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private currentRoomSubject = new BehaviorSubject<{ id: string, user: string } | null>(null);
  currentRoom$ = this.currentRoomSubject.asObservable();

  joinRoom(roomId: string, username: string): void {
    this.currentRoomSubject.next({ id: roomId, user: username });
  }

  setCurrentRoom(roomId: string, username: string) {
    this.currentRoomSubject.next({ id: roomId, user: username });
  }
}
