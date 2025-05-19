import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private isConnected = false;
  
  async startConnection(roomId: string): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.signalRUrl}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
          return Math.min(retryContext.elapsedMilliseconds * 2, 10000);
        }
      })
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    try {
      await this.hubConnection.start();
      this.isConnected = true;
      console.log('SignalR conectado. ID:', this.hubConnection.connectionId);
      await this.joinRoom(roomId);
    } catch (err) {
      console.error('Falha na conexão SignalR:', err);
      throw new Error('Não foi possível conectar ao servidor. Tente recarregar a página.');
    }
  }
  
  private async joinRoom(roomId: string): Promise<void> {
    if (!this.isConnected) {
      await this.startConnection(roomId);
    }
    await this.hubConnection.invoke('JoinRoom', roomId)
      .catch(err => console.error('Erro ao entrar na sala:', err));
  }
  
  async submitVote(roomId: string, user: string, vote: string): Promise<void> {
    if (!this.isConnected) {
      await this.startConnection(roomId);
    }
    await this.hubConnection.invoke('SubmitVote', roomId, user, vote)
      .catch(err => console.error('Erro ao enviar voto:', err));
  }
  
  onReceiveMessage(callback: (user: string, message: string) => void): void {
    this.hubConnection.on('ReceiveVote', callback);
  }
}
