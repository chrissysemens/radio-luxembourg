import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenComponent } from './token/token.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes = [
  { path: '', redirectTo: '/token', pathMatch: 'full' },
  { path: 'token', component: TokenComponent },
  { path: 'welcome', component: WelcomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
