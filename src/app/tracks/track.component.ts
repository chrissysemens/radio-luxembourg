import { Component, Input } from '@angular/core';
import { Track } from '../types/track';
import { QueueService } from '../queue/queue.service';
import { SessionService } from '../session/session.service';
import { MyPlaylistService } from '../playlist/my-playlist.service';
import { PlaylistService } from '../playlist/playlist.service';
import { ProfileService } from '../profile/profile.service';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  providers: [MyPlaylistService, PlaylistService, ProfileService, QueueService]
})

export class TrackComponent {

    constructor(
      private profileService: ProfileService,
      private myPlaylistService: MyPlaylistService,
      private playlistService: PlaylistService,
      private queueService: QueueService,
      private sessionService: SessionService){}
    @Input() track: Track;

    clicked(track: Track){
        const session = this.sessionService.getSession();
        this.queueService.requestSong(session.channelId, track, session.userId);
        this.myPlaylistService.getMyPlaylists().subscribe(resp => console.log(resp));
        this.playlistService.getTracks(session.playlistId).subscribe(resp => console.log(resp));
        this.profileService.getCurrentlyPlaying().subscribe(resp => console.log(resp));
    }
}
