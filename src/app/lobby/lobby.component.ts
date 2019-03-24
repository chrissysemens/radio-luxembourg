import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../channel/channel.service';
import { Channel } from '../types/channel';
import { first  } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Playlist } from '../types/playlist';
import { CreatePlaylistRequest } from '../request-types/playlist-create';
import { MyPlaylistService } from '../playlist/my-playlist.service';
import { ProfileService } from '../profile/profile.service';
import { SessionService } from '../session/session.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [ChannelService, MyPlaylistService, PlaylistService, ProfileService, SessionService, UserPlaylistService]
})

export class LobbyComponent implements OnInit {

  constructor(
    private channelService: ChannelService,
    private myPlaylistService: MyPlaylistService,
    private playlistService: PlaylistService,
    private profileService: ProfileService,
    private sessionService: SessionService,
    private userPlaylistService: UserPlaylistService,
    private router: Router) {};

    channels: Array<Channel> = new Array<Channel>();
    playlistId: string;
    playlistUri: string;

    ngOnInit(){
        this.channelService.list('channels')
        .snapshotChanges()
        .pipe(first())
        .subscribe((res: any) => {
          res.forEach((result: any) => {
            
            const id = result.payload.doc.id;
            const data = result.payload.doc.data();

            let channel = new Channel(data.name, data.owner, id);

            this.channels.push(channel);
          });
        });
    }

    channelSelected(channelId: string){

      forkJoin(
        this.profileService.getMyProfile(),
        this.myPlaylistService.getMyPlaylists()
      )
      .subscribe(([profile, playlists]) => {
        playlists.items.forEach((playlist: Playlist) => {
          if(playlist.name === 'RadioLux') {
            this.playlistId = playlist.id;
            this.playlistUri = playlist.uri;
          }
        });
  
        if(this.playlistId){
          this.playlistService.clearPlaylist(this.playlistId);
          this.sessionService.createSession(profile.id, channelId, this.playlistId, this.playlistUri);
          this.router.navigate(['channel', channelId]);

        } else {
          const playlistReq = new CreatePlaylistRequest('RadioLux', true, false, 'You control the jams');
          this.userPlaylistService.createRadioPlaylist(profile.id, playlistReq)
            .subscribe((playlistResp: any) => {
              this.playlistId = playlistResp.id;
              this.playlistUri = playlistResp.uri;
              this.sessionService.createSession(profile.id, channelId, this.playlistId, this.playlistUri);
              this.router.navigate(['channel', channelId]);
            });

          }
        });
    }
}
