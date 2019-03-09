import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../channel/channel.service';
import { Channel } from '../types/channel';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [ChannelService]
})

export class LobbyComponent implements OnInit {

  constructor(
    private channelService: ChannelService) {};

    channels: Array<Channel> = new Array<Channel>();

    ngOnInit(){
        this.channelService.list('channels')
        .snapshotChanges()
        .pipe(first())
        .subscribe((res: any) => {
          res.forEach((result: any) => {
            
            const id = result.payload.doc.id;
            const data = result.payload.doc.data();

            let channel = new Channel(data.name, data.owner, id);

            this.channels.push(channel);
          });
        });
    }
}
