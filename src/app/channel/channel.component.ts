import { Component, OnInit, ɵConsole } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Session } from '../types/sesssion';
import { QueueService } from '../queue/queue.service';
import { PlaylistService } from '../playlist/playlist.service';
import { Request } from '../types/request';
import { take } from 'rxjs/operators';
import { PlayerService } from '../player/player.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [QueueService, PlaylistService, PlayerService, ProfileService, SessionService]
})

export class ChannelComponent implements OnInit {
  queue: Array<Request>;
  searchResults: Array<any>;
  session: Session;
  timer: any;

  constructor(private playlistService: PlaylistService, 
              private playerService: PlayerService,
              private profileService: ProfileService,
              private queueService: QueueService, 
              private sessionService: SessionService) { };

  ngOnInit(){
     this.session = this.sessionService.getSession();
     this.connectQueue();
     this.stayTuned();
     this.play();
  }

  /**
   * When a track is searched
   * @param results 
   */
  searched(results: Array<any>){
    this.searchResults = results;
  }
  

  /***
   * Shows the queue in the client
   */
  connectQueue(){
    this.queueService.connect(this.session.channelId)
      .valueChanges()
      .subscribe((requests: Array<Request>) => {
        this.queue = requests.filter(request => {
          return request.track_start + request.track.duration_ms > Date.now();
        });
      });
  }

   /***
    * Responsible for listening to tracks added, 
    * queueing up new ones and removing old ones.
    * Kicks off playback if not currently playing.
    */
  stayTuned(){
    let requestsToAdd = new Array<string>();
    let requestsToRemove = new Array<string>();

    this.queueService.clearUpQueue(this.session.channelId);
    
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
              
              if(requestsToRemove.length){
                this.playlistService.removeTracks(this.session.playlistId, requestsToRemove)
                  .pipe(take(1))
                  .subscribe();
                requestsToRemove = new Array<string>();
              }

              if(!playlistTracks.length 
                  && request.track_start + request.track.duration_ms > Date.now()){
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
        });
      })

      this.profileService.getCurrentlyPlaying()
            .pipe(take(1))
            .subscribe((resp: any) => {

              if(resp.progress_ms <= 0){
                this.play();
              }
            });
    })
  }

  play() {
    this.session = this.sessionService.getSession();

    this.queueService.getTracks(this.session.channelId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((requests: Array<Request>) => {

        requests = requests.sort((a:Request , b: Request) => {
          return a.track_start - b.track_start;
        });

        requests.forEach(request => {

          const trackStarted = Date.now() > request.track_start;
          const trackFinished = Date.now() > request.track_start + request.track.duration_ms;

          if(trackStarted && !trackFinished){
            const currentPosition = Date.now() - request.track_start;
            const remaining = request.track.duration_ms - currentPosition;

            this.playerService.startPlayer([request.track.uri], currentPosition).pipe(take(1)).subscribe();

            if(this.timer){
              clearTimeout(this.timer);
            }

            window.setTimeout(() => this.play(), remaining);
          }
        });
      });
   } 
}


