import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';
import { Channel } from '../types/channel';
import { CreatePlaylistRequest } from '../requests/playlist-create';
import { SessionService } from '../session/session.service';
import { QueueService } from '../queue/queue.service';
import { Profile } from '../types/profile';
import { Playlist } from '../types/playlist';
import { Session } from '../types/sesssion';


@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ProfileService, QueueService, UserPlaylistService]
})

export class WelcomeComponent implements OnInit {

  searchResults: Array<any>;
  channelId: string;
  playlistId: string;
  queue: any;

  constructor(
    private queueService: QueueService,
    private profileService: ProfileService,
    private sessionService: SessionService,
    private userPlaylistService: UserPlaylistService) {};

  ngOnInit(){}

  createSession(){
    const channel = new Channel('TopsOfTracks', 'fistfullofbees');

    const playlistReq = new CreatePlaylistRequest('RadioLux', true, false, 'You control the jams');

    this.profileService.getMyProfile()
      .subscribe( 
        (profile: Profile) => {
          let user = profile;

          this.userPlaylistService.createRadioPlaylist(user.id, playlistReq)
            .subscribe(
              (playlist: Playlist) => {

              const session = new Session(user, '123456', playlist.id);
              this.sessionService.createSession(session);
          });
      });
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }

  stayTuned(){
    const session = this.sessionService.getSession();
    this.queueService.connect(session.channelId).valueChanges()
      .subscribe((requests: Array<Request>) => {
        console.log(requests);
        this.queue = requests;
      });
  }
}
