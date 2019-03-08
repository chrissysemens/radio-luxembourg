import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';
import { Channel } from '../types/channel';
import { CreatePlaylistRequest } from '../requests/playlist-create';
import { Session } from '../types/sesssion';
import { SessionService } from '../session/session.service';
import { forkJoin } from 'rxjs';
import { QueueService } from '../queue/queue.service';
import { Track } from '../types/track';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ProfileService, QueueService, SessionService, UserPlaylistService]
})

export class WelcomeComponent implements OnInit {

  searchResults: Array<any>;
  userId: string;
  channelId: string;
  playlistId: string;
  queue: any;

  constructor(
    private queueService: QueueService,
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
      this.sessionService.createSession(session)
        .then((session: any) => {
          localStorage.setItem('session_id', session.id);
        }) 
    });
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }

  stayTuned(){
    const sessionId = localStorage.getItem('session_id');
    this.queueService.connect(sessionId).valueChanges()
      .subscribe((requests: Array<Request>) => {
        console.log(requests);
        this.queue = requests;
      });
  }
}
