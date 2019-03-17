import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Request } from '../types/request';
import { Track } from '../types/track';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';
import { Profile } from '../types/profile';
import { map, take }  from 'rxjs/operators';

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
        let trackStart = 0;
        let gap = 0;

        this.fs.collection(routes.request(channelId))
        .valueChanges() 
        .pipe(take(1))
        .subscribe((requests: Array<Request>) => {
            requests = requests.sort((a:Request , b: Request) => {
                return a.track_start - b.track_start;
            });

            const lastRequest = requests[requests.length - 1];

            if(lastRequest &&
                (lastRequest.track_start + lastRequest.track.duration_ms) < Date.now()) {
                trackStart = (lastRequest.track_start + lastRequest.track.duration_ms) + gap;
            } else {
                trackStart = Date.now();
            }
            const request = new Request(track, trackStart, profile);
            const obj = JSON.parse(JSON.stringify(request));

            return this.fs.collection(routes.request(channelId)).add(obj);
        });
    }
}