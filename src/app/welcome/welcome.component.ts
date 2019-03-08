import { Component, OnInit, ɵConsole } from '@angular/core';
import { RadioService } from '../radio/radio.service';
import { ProfileService } from '../profile/profile.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';
import { Channel } from '../types/channel';
import { CreatePlaylistRequest } from '../requests/playlist-create';
import { Session } from '../types/sesssion';
import { SessionService } from '../session/session.service';
import { forkJoin} from 'rxjs';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ProfileService, RadioService, SessionService, UserPlaylistService]
})

export class WelcomeComponent implements OnInit {

  searchResults: Array<any>;
  userId: string;
  channelId: string;
  playlistId: string;

  constructor(
    private radioService: RadioService,
    private profileService: ProfileService,
    private sessionService: SessionService,
    private userPlaylistService: UserPlaylistService) {};

  ngOnInit(){
    this.profileService.getMyProfile()
      .subscribe((resp: any) => { 
        localStorage.setItem('user_id', resp.id);
    });
  }

  createSession(){
    const channel = new Channel('123456', 'TopsOfTracks', 'fistfullofbees');
    this.channelId = channel.id;

    const playlistReq = new CreatePlaylistRequest('RadioLux', true, false, 'You control the jams');

    let profile = this.profileService.getMyProfile();
    let playlist = this.userPlaylistService.createRadioPlaylist(playlistReq);

    forkJoin([profile, playlist]).subscribe((results: any) => {
      this.userId = results[0].id;
      this.playlistId = results[1].id;

      const session = new Session(this.userId, this.channelId, this.playlistId);
      this.sessionService.createSession(this.userId, session)
        .then((session: any) => {
          localStorage.setItem('session_id', session.id);
        }) 
    });
  }
  searched(results: Array<any>){
    this.searchResults = results;
  }

  startRadio(){
    this.radioService.connect();
  }
}
