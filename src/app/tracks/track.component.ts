import { Component, Input } from '@angular/core';
import { Track } from '../types/track';
import { QueueService } from '../queue/queue.service';
import { SessionService } from '../session/session.service';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  providers: [QueueService]
})

export class TrackComponent {

    constructor(
      private queueService: QueueService,
      private sessionService: SessionService){}
    @Input() track: Track;

    clicked(track: Track){
        const session = this.sessionService.getSession();
        this.queueService.requestSong(session.channelId, track, session.user);
    }
}
