import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queue-track',
  templateUrl: './queue-track.component.html',
  styleUrls: ['./queue-track.component.scss'],
})

export class QueueTrackComponent {

    constructor(){}
    @Input() request;

    ngOnInit(){}
}
