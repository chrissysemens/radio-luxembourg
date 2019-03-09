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

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [ProfileService, UserPlaylistService]
})

export class ChannelComponent implements OnInit {

  channel: Channel;

  constructor(
    private route: ActivatedRoute,
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

          this.userPlaylistService.createRadioPlaylist(user.id, playlistReq)
            .subscribe(
              (playlist: Playlist) => {

              const session = new Session(user, channelId, playlist.id);
              this.sessionService.createSession(session);
          });
      });
  }
}
