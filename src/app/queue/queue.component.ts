import { Component, Input } from '@angular/core';
import { Request } from '../types/request';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})

export class QueueComponent {

    constructor(){}
    //@Input() queue;

    queue: Array<any>;

    ngOnInit(){
      this.queue = [{"request_time":"2019-04-12T14:26:52.047Z","requestor":"fistfullofbees","track":{"artist":[{"external_urls":{"spotify":"https://open.spotify.com/artist/776Uo845nYHJpNaStv1Ds4"},"href":"https://api.spotify.com/v1/artists/776Uo845nYHJpNaStv1Ds4","id":"776Uo845nYHJpNaStv1Ds4","name":"Jimi Hendrix","type":"artist","uri":"spotify:artist:776Uo845nYHJpNaStv1Ds4"}],"duration_ms":240800,"id":"2aoo2jlRnM3A0NyLQqMN2f","imageUrl":{"height":64,"url":"https://i.scdn.co/image/f4f6903d134ff489abbc7ea5545c6cd3a5cb51df","width":64},"name":"All Along the Watchtower","uri":"spotify:track:2aoo2jlRnM3A0NyLQqMN2f"},"track_start":1555079339668},{"request_time":"2019-04-12T14:27:03.040Z","requestor":"fistfullofbees","track":{"artist":[{"external_urls":{"spotify":"https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy"},"href":"https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy","id":"0oSGxfWSnnOXhD2fKuz2Gy","name":"David Bowie","type":"artist","uri":"spotify:artist:0oSGxfWSnnOXhD2fKuz2Gy"},{"external_urls":{"spotify":"https://open.spotify.com/artist/3d2pb1dHTm8b61zAGVUVvO"},"href":"https://api.spotify.com/v1/artists/3d2pb1dHTm8b61zAGVUVvO","id":"3d2pb1dHTm8b61zAGVUVvO","name":"Mick Jagger","type":"artist","uri":"spotify:artist:3d2pb1dHTm8b61zAGVUVvO"}],"duration_ms":204786,"id":"6FnuMo55jNECTDdS1nD5H0","imageUrl":{"height":64,"url":"https://i.scdn.co/image/a7c9746a2dff5fd94dfa1a6df1668e72e271d9bd","width":64},"name":"Dancing in the Street - 2002 Remaster","uri":"spotify:track:6FnuMo55jNECTDdS1nD5H0"},"track_start":1555079580468}]
    }
}
