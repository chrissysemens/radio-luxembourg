import { Component } from '@angular/core';
import { Track } from '../types/track';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  title = 'We Are The Radio!';

  searchResults: Array<any>; //TODO: Implement generics

  searched(results: Array<any>){
    this.searchResults = results;
    console.log(this.searchResults);
  }
}
