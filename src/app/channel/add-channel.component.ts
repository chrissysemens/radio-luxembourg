import { Component, OnInit } from '@angular/core';
import { ChannelService } from './channel.service';
import { Channel } from '../types/channel';
import { ProfileService } from '../profile/profile.service';

@Component({
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
  providers: [ChannelService, ProfileService]
})

export class AddChannelComponent implements OnInit {

  name: string;
  userId: string;

  constructor(
    private channelService: ChannelService,
    private profileService: ProfileService) {};

  ngOnInit( ){
    this.profileService.getMyProfile()
      .subscribe((res: any) => {
        this.userId = res.id;
      })
  };

  addChannel(){
    const channel = new Channel(this.name, this.userId);
    this.channelService.addChannel(channel);
  }
}