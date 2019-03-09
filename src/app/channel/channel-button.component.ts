import { Component, OnInit, Input } from '@angular/core';
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
  ngOnInit(){}

  join(channel: Channel){
    this.router.navigate(['channel', channel.id]);
  }
}
