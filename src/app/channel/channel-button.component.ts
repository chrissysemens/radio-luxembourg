import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Channel } from '../types/channel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-button',
  templateUrl: './channel-button.component.html',
  styleUrls: ['./channel-button.component.scss'],
  providers: []
})

export class ChannelButtonComponent implements OnInit {

  constructor(private router: Router) {};

  @Input() channel: Channel;
  @Output() channelSelected = new EventEmitter(); 

  ngOnInit(){}

  join(channel: Channel){

    this.channelSelected.emit(channel.id);
  }
}
