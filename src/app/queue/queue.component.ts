import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})

export class QueueComponent {

    constructor(){}
    @Input() queue;
}
