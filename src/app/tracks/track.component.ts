import { Component, Input } from '@angular/core';
import { Track } from '../types/track';
import { RadioService } from '../radio/radio.service';
import { SessionService } from '../session/session.service';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  providers: [RadioService]
})

export class TrackComponent {

    constructor(
      private radioService: RadioService,
      private sessionService: SessionService){}
    @Input() track: Track;

    clicked(track: Track){
        const session = this.sessionService.getSession();
        console.log(session);
        this.radioService.requestSong(session.channelId, track, session.user);
    }
}
