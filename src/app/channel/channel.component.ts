import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../types/channel';
import { CreatePlaylistRequest } from '../request-types/playlist-create';
import { Profile } from '../types/profile';
import { ProfileService } from '../profile/profile.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';
import { Playlist } from '../types/playlist';
import { Session } from '../types/sesssion';
import { SessionService } from '../session/session.service';
import { MyPlaylistService } from '../playlist/my-playlist.service';
import { QueueService } from '../queue/queue.service';

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [MyPlaylistService, QueueService, ProfileService, UserPlaylistService]
})

export class ChannelComponent implements OnInit {

  channel: Channel;
  playlistId: string;
  searchResults: Array<any>;
  queue: any;

  constructor(
    private route: ActivatedRoute,
    private myPlaylistService: MyPlaylistService,
    private profileService: ProfileService,
    private queueService: QueueService,
    private userPlaylistService: UserPlaylistService,
    private sessionService: SessionService
  ) {};

  ngOnInit(){
    const channelId = this.route.snapshot.paramMap.get("id");
    const playlistReq = new CreatePlaylistRequest('RadioLux', true, false, 'You control the jams');

    this.profileService.getMyProfile()
      .subscribe((profile: Profile) => {
          let user = profile;
          this.myPlaylistService.getMyPlaylists()
            .subscribe((data: any) => {

                console.log(data);
                const playlists = data.items;
                playlists.forEach((playlist: Playlist) => {
                  if(playlist.name === 'RadioLux') {
                    this.playlistId = playlist.id;
                  }
                });

                if(this.playlistId){
                  const session = new Session(user, channelId, this.playlistId);
                  console.log(session);
                  this.sessionService.createSession(session);
                  this.stayTuned();
                } else {
                    this.userPlaylistService.createRadioPlaylist(user.id, playlistReq)
                      .subscribe(
                        (playlist: Playlist) => {
                          const session = new Session(user, channelId, playlist.id);
                          this.sessionService.createSession(session);
                          console.log(session);
                          this.stayTuned();
                      })
                }
            })
      })
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }

  stayTuned(){
    const session = this.sessionService.getSession();
    this.queueService.connect(session.channelId).valueChanges()
      .subscribe((requests: Array<Request>) => {
        this.queue = requests;

        console.log(this.queue);
      });
  }
}