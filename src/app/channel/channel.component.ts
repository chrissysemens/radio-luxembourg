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

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [MyPlaylistService, ProfileService, UserPlaylistService]
})

export class ChannelComponent implements OnInit {

  channel: Channel;
  playlistId: string;

  constructor(
    private route: ActivatedRoute,
    private myPlaylistService: MyPlaylistService,
    private profileService: ProfileService,
    private userPlaylistService: UserPlaylistService,
    private sessionService: SessionService
  ) {};

  ngOnInit(){
    const channelId = this.route.snapshot.paramMap.get("id");
    const playlistReq = new CreatePlaylistRequest('RadioLux', true, false, 'You control the jams');


    this.profileService.getMyProfile()
      .subscribe( 
        (profile: Profile) => {
          let user = profile;

          this.myPlaylistService.getMyPlaylists()
            .subscribe((data: any) => {

                const playlists = data.items;
                playlists.forEach((playlist: Playlist) => {
                  if(playlist.name === 'RadioLux') {
                    this.playlistId = playlist.id;
                  }
                });

                if(this.playlistId){
                  const session = new Session(user, channelId, this.playlistId);
                  this.sessionService.createSession(session);
                } else {
                    this.userPlaylistService.createRadioPlaylist(user.id, playlistReq)
                      .subscribe(
                        (playlist: Playlist) => {
                          const session = new Session(user, channelId, playlist.id);
                          this.sessionService.createSession(session);
                      }).unsubscribe();
                }
            }).unsubscribe();
      }).unsubscribe();
    }
}
