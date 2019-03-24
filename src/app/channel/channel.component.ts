import { Component, OnInit, ɵConsole } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Session } from '../types/sesssion';
import { QueueService } from '../queue/queue.service';
import { PlaylistService } from '../playlist/playlist.service';
import { Request } from '../types/request';
import { take  } from 'rxjs/operators';
import { PlayerService } from '../player/player.service';

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [QueueService, PlaylistService, PlayerService, SessionService]
})

export class ChannelComponent implements OnInit {

  searchResults: Array<any>;
  session: Session;

  constructor(private playlistService: PlaylistService, 
              private playerService: PlayerService,
              private queueService: QueueService, 
              private sessionService: SessionService) { };

  ngOnInit(){
     this.session = this.sessionService.getSession();
     this.stayTuned();
     this.play(this.session.playlistUri);
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }

  stayTuned(){
    let requestsToAdd = new Array<string>();
    let requestsToRemove = new Array<string>();

    this.queueService.connect(this.session.channelId)
      .snapshotChanges(['added'])
      .subscribe(requests => {

        this.playlistService.getTracks(this.session.playlistId)
          .subscribe((data: any) => {
            let playlistTracks = data.items;

            requests.map(item => {
              const request = item.payload.doc.data() as Request;

              if(request.track_start + request.track.duration_ms < Date.now()){
                requestsToRemove.push(request.track.uri);
              }

              if(!playlistTracks.length){
                requestsToAdd.push(request.track.uri);
              } else {
                let found = playlistTracks.some(item => item.track.id === request.track.id);
                
                if(!found){
                  if(request.track_start + request.track.duration_ms > Date.now()){
                    requestsToAdd.push(request.track.uri);
                  }
                }
              }

              if(requestsToAdd.length){
                this.playlistService.addTracks(this.session.playlistId, requestsToAdd)
                  .pipe(take(1))
                  .subscribe();
                requestsToAdd = new Array<string>();
              }

              if(requestsToRemove.length){
                this.playlistService.removeTracks(this.session.playlistId, requestsToRemove)
                  .pipe(take(1))
                  .subscribe();
                requestsToRemove = new Array<string>();
              }
        });
      })
    })
  }

  play(playlistUri: string) {
    const session = this.sessionService.getSession();

    this.queueService.getTracks(session.channelId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((requests: Array<Request>) => {

        requests = requests.sort((a:Request , b: Request) => {
          return a.track_start - b.track_start;
        });

        requests.forEach(request => {

          const trackStarted = Date.now() > request.track_start;
          const trackFinished = Date.now() < request.track_start + request.track.duration_ms;

          if(trackStarted && !trackFinished){
            const currentPosition = (request.track_start + request.track.duration_ms) - Date.now();
            this.playerService.startPlayer(playlistUri, currentPosition).pipe(take(1)).subscribe();
          }
        });
      });
   } 
}


