import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../channel/channel.service';
import { Channel } from '../types/channel';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [ChannelService]
})

export class LobbyComponent implements OnInit {

  constructor(
    private channelService: ChannelService) {};

    channels: Array<Channel>;

    ngOnInit(){
        this.channelService.getAll()
            .valueChanges()
            .subscribe((channels: Array<Channel>) => {
                this.channels = channels;
                console.log(channels);
            });
    } 
}
