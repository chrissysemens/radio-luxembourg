import { Component } from '@angular/core';
import { RadioService } from '../radio/radio.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [RadioService]
})
export class WelcomeComponent {
  title = 'We Are The Radio!';

  constructor(private radioService: RadioService) {}
  searchResults: Array<any>; //TODO: Implement generics

  searched(results: Array<any>){
    this.searchResults = results;
  }

  startRadio(){
    this.radioService.connect();
  }
}
