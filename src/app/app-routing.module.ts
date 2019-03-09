import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddChannelComponent } from './channel/add-channel.component';
import { TokenComponent } from './token/token.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes = [
  { path: '', redirectTo: '/token', pathMatch: 'full' },
  { path: 'add-channel', component: AddChannelComponent },
  { path: 'token', component: TokenComponent },
  { path: 'lobby', component: LobbyComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
