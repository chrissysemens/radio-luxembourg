import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';
import { Channel } from '../types/channel';
import { CreatePlaylistRequest } from '../request-types/playlist-create';
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
  
  searched(results: Array<any>){
    this.searchResults = results;
  }

  stayTuned(){
    const session = this.sessionService.getSession();
    this.queueService.connect(session.channelId).valueChanges()
      .subscribe((requests: Array<Request>) => {
        this.queue = requests;
      });
  }
}
