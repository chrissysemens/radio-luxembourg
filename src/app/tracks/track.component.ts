import { Component, Input } from '@angular/core';
import { Track } from '../types/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})

export class TrackComponent {

    constructor(){}
    @Input() track: Track;


    clicked(track: Track){
        console.log(track);
    }
}
