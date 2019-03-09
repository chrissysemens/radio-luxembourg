import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from './channel.service';
import { Channel } from '../types/channel';

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [ChannelService]
})

export class ChannelComponent implements OnInit {

  channel: string;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService
  ) {};

  ngOnInit(){
    const channelName = this.route.snapshot.paramMap.get("name");
    console.log(channelName);
  }
}
