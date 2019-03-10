import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Request } from '../types/request';
import { Track } from '../types/track';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';
import { Profile } from '../types/profile';

const baseUrl = 'https://api.spotify.com/v1';
const routes = {
    play: () => `/me/player/play`,
    add: (playlistId) => `/playlists/${playlistId}/tracks`,
    request: (channelId: string) => `channels/${channelId}/tracks`,
    queue: (channelId: string) => `channels/${channelId}/tracks`
};

@Injectable()
export class RadioService extends HttpService<any>{
    
    constructor(http: HttpClient, 
                private fs: AngularFirestore) {
                    super(http, baseUrl);
                }

    requestSong(channelId: string, track: Track, profile: Profile){

        let trackStart = Date.now()
        const gap = 2000;

        const conn = this.fs.collection('tracks').valueChanges()
            .subscribe((tracks: any) => {
                const lastTrack = tracks[tracks.length - 1];

                if(lastTrack){
                    trackStart = (lastTrack.track_start + lastTrack.duration) + gap;
                }
            });

        conn.unsubscribe();
        const request = new Request(track, trackStart, profile);

        const obj = JSON.parse(JSON.stringify(request));
        return this.fs.collection(routes.request(channelId)).add(obj);
    }
    
    /*addTracksToPlaylist(channelId: string){
        const conn = this.fs.collection(routes.queue(channelId))
            .valueChanges()
            .subscribe((tracks: any) => {

                console.log(tracks);
                const now = Date.now();

                if(tracks.length){
                    const body = {
                        "uris": [tracks[0].uri],
                        "position_ms": now - tracks[0].track_start
                    }

                    this.put(routes.play(), body).subscribe(resp => console.log(resp));
                } else {
                    // TODO: What if there's no songs?  
                }
            });

        conn.unsubscribe;
    }*/
}