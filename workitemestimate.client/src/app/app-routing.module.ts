import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { VotingComponent } from './components/voting/voting.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LobbyComponent
  },
  {
    path: 'voting',
    component: VotingComponent
  },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
