import { Component } from '@angular/core';
import { Track } from '../types/track';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  title = 'We Are The Radio!';

  searchResults: Array<Track>;

  searched(results: Array<Track>){
    this.searchResults = results;
    console.log(this.searchResults);
  }

  /*searchResults: Array<Track> = [{
    id: '1',
    name: 'test',
    artist: ['sting', 'madonna']
  },
  {
    id: '2',
    name: 'test2',
    artist: ['barry']
  }];*/
}
