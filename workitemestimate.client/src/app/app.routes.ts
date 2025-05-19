import { Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { VotingComponent } from './components/voting/voting.component';

export const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
    pathMatch: 'full' 
  },
  {
    path: 'voting',
    component: VotingComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
