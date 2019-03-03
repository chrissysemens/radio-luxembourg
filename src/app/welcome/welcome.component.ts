import { Component, OnInit } from '@angular/core';
import { RadioService } from '../radio/radio.service';
import { ProfileService } from '../profile/profile.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [UserPlaylistService, ProfileService, RadioService]
})

export class WelcomeComponent implements OnInit {

  searchResults: Array<any>;
  userId: string;

  constructor(
    private radioService: RadioService,
    private userPlaylistService: UserPlaylistService,
    private profileService: ProfileService) {};

  ngOnInit(){
    this.profileService.getMyProfile().subscribe(resp => {
      localStorage.setItem('user_id', resp.id);
    })
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }

  createPlaylist(){
    this.userPlaylistService.createRadioPlaylist('RadioLux', true, false, 'You control the Jams');
  }

  startRadio(){
    this.radioService.connect();
  }
}
