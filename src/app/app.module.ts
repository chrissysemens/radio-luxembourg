import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';  
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TrackComponent } from './tracks/track.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { RequestInterceptor } from './core/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    WelcomeComponent,
    SearchComponent,
    SearchResultsComponent,
    TrackComponent
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
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
