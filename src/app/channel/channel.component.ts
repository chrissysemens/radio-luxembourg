import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../types/channel';
import { CreatePlaylistRequest } from '../request-types/playlist-create';
import { Profile } from '../types/profile';
import { PlaylistService } from '../playlist/playlist.service';
import { ProfileService } from '../profile/profile.service';
import { UserPlaylistService } from '../playlist/user-playlist.service';
import { Playlist } from '../types/playlist';
import { Session } from '../types/sesssion';
import { SessionService } from '../session/session.service';
import { MyPlaylistService } from '../playlist/my-playlist.service';
import { QueueService } from '../queue/queue.service';
import { Request } from '../types/request';

@Component({
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  providers: [MyPlaylistService, QueueService, PlaylistService, ProfileService, UserPlaylistService]
})

export class ChannelComponent implements OnInit {

  channel: Channel;
  playlistId: string;
  searchResults: Array<any>;
  queue: any;

  constructor(
    private route: ActivatedRoute,
    private myPlaylistService: MyPlaylistService,
    private playlistService: PlaylistService,
    private profileService: ProfileService,
    private queueService: QueueService,
    private userPlaylistService: UserPlaylistService,
    private sessionService: SessionService
  ) {};

  ngOnInit(){
    const channelId = this.route.snapshot.paramMap.get("id");
    const playlistReq = new CreatePlaylistRequest('RadioLux', true, false, 'You control the jams');

    this.profileService.getMyProfile()
      .subscribe((profile: Profile) => {
          let user = profile;
          this.myPlaylistService.getMyPlaylists()
            .subscribe((data: any) => {
                const playlists = data.items;
                playlists.forEach((playlist: Playlist) => {
                  if(playlist.name === 'RadioLux') {
                    this.playlistId = playlist.id;
                  }
                });

                if(this.playlistId){
                  const session = new Session(user, channelId, this.playlistId);
                  this.sessionService.createSession(session);
                  this.stayTuned();
                } else {
                    this.userPlaylistService.createRadioPlaylist(user.id, playlistReq)
                      .subscribe(
                        (playlist: Playlist) => {
                          const session = new Session(user, channelId, playlist.id);
                          this.sessionService.createSession(session);
                          this.stayTuned();
                      })
                }
            })
      })
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }

  stayTuned(){
    // Get session details
    const session = this.sessionService.getSession();

    // Instantiate an array of the tracks we need to add
    let requestsToAdd = new Array<string>();

    // Connect to the session
    this.queueService.connect(session.channelId)
      .snapshotChanges(['added'])
      .subscribe(requests => {

        // With each update:
        this.playlistService.getTracks(session.playlistId)
          .subscribe((data: any) => {

            let playlistTracks = data.items;

            // Get all of the tracks in the queue
            requests.map(item => {
              const requestId = item.payload.doc.id;
              const request = item.payload.doc.data() as Request;

            // If the playlist is empty, just add them
            if(!playlistTracks.length){
              requestsToAdd.push(request.track.uri);
            } else {

              // If it has length, just add the ones that are not already on the playlist  
              let found = playlistTracks.some(item => item.track.id === request.track.id);
              if(!found){
                requestsToAdd.push(request.track.uri);
              }
            }

            // Update the playlist
            if(requestsToAdd.length){
              this.playlistService.addTracks(session.playlistId, requestsToAdd).subscribe();
              requestsToAdd = new Array<string>();
            }

            // Clean up any old songs
            if(request.track_start + request.track.duration_ms < Date.now()){
              this.queueService.deleteTrack(session.channelId, requestId);
              this.playlistService.removeTracks(session.playlistId, [request.track.uri]).subscribe();
            }
        })
      })
    })
  }
}