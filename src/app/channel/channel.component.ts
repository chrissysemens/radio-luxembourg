import { Component, OnInit, ɵConsole } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Session } from '../types/sesssion';
import { QueueService } from '../queue/queue.service';
import { PlaylistService } from '../playlist/playlist.service';
import { Request } from '../types/request';
import { take } from 'rxjs/operators';
import { PlayerService } from '../player/player.service';

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [QueueService, PlaylistService, PlayerService, SessionService]
})

export class ChannelComponent implements OnInit {

  queue: Array<Request>;
  searchResults: Array<any>;
  session: Session;

  constructor(private playlistService: PlaylistService, 
              private playerService: PlayerService,
              private queueService: QueueService, 
              private sessionService: SessionService) { };

  ngOnInit(){
     this.session = this.sessionService.getSession();
     this.connectQueue();
     this.stayTuned();
     this.play(this.session.playlistUri);
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }
  

  connectQueue(){
    this.queueService.connect(this.session.channelId)
      .valueChanges()
      .subscribe((requests: Array<Request>) => {
        this.queue = requests.filter(request => {
          return request.track_start + request.track.duration_ms > Date.now();
        });
        console.log(this.queue);
      });
  }


  stayTuned(){
    let requestsToAdd = new Array<string>();
    let requestsToRemove = new Array<string>();

    this.queueService.clearUpQueue(this.session.channelId);
    
    this.queueService.connect(this.session.channelId)
      .snapshotChanges(['added'])
      .subscribe(requests => {
        let newQueue = new Array<Request>();

          requests.map(item => {
            const request = item.payload.doc.data() as Request;

            if(request.track_start > Date.now()){
              newQueue.push(request);
            }
          });

          newQueue = newQueue.sort((a:Request , b: Request) => {
            return a.track_start - b.track_start;
          });

          const qis = new Array<string>();
          newQueue.forEach(qi => {
            qis.push(qi.track.uri);
          })

          this.playlistService.replaceTracks(this.session.playlistId, qis).subscribe();
    })
  }

  play(playlistUri: string) {
    console.log('play triggered');
    const session = this.sessionService.getSession();

    this.queueService.getTracks(session.channelId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((requests: Array<Request>) => {

        console.log('current requests:', requests);
        requests = requests.sort((a:Request , b: Request) => {
          return a.track_start - b.track_start;
        });

        console.log('sorted requests:', requests);
        requests.forEach(request => {

          const trackStarted = Date.now() > request.track_start;
          const trackFinished = Date.now() > request.track_start + request.track.duration_ms;

          if(trackStarted && !trackFinished){
            const currentPosition = Date.now() - request.track_start;
            const posMins = currentPosition / 60000;
            console.log(`currently playing: ${request.track.name}`);
            console.log(`at position: ${posMins}`);
            this.playerService.startPlayer(playlistUri, currentPosition).pipe(take(1)).subscribe();
          }
        });
      });
   } 
}


