import { Component, OnInit } from '@angular/core';
import { ChannelService } from './channel.service';
import { Channel } from '../types/channel';

@Component({
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
  providers: [ChannelService]
})

export class AddChannelComponent implements OnInit {

  name: string;
  constructor(private channelService: ChannelService) {};

  ngOnInit( ){};

  addChannel(){
    const channel = new Channel(this.name, 'fistfullofbees');
    console.log(channel);
    this.channelService.addChannel(channel);
  }
}