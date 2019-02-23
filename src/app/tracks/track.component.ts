import { Component, Input } from '@angular/core';
import { Track } from '../types/track';
import { RadioService } from '../radio/radio.service';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  providers: [RadioService]
})

export class TrackComponent {

    constructor(private radioService: RadioService){}
    @Input() track: Track;

    clicked(track: Track){
        this.radioService.requestSong(track);
    }
}
