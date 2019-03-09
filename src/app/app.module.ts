import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddChannelComponent } from './channel/add-channel.component';
import { ChannelComponent } from './channel/channel.component';
import { environment } from '../environments/environment';
import { LobbyComponent } from './lobby/lobby.component';
import { QueueComponent } from './queue/queue.component';
import { ResponseInterceptor } from './core/http-response.interceptor';
import { RequestInterceptor } from './core/http-request.interceptor';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SessionService } from './session/session.service';
import { TokenComponent } from './token/token.component';  
import { TrackComponent } from './tracks/track.component';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    AddChannelComponent,
    ChannelComponent,
    LobbyComponent,
    SearchComponent,
    SearchResultsComponent,
    TrackComponent,
    TokenComponent,
    QueueComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'radio-lux'),
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AngularFirestore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
