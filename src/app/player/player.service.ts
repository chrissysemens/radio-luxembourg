import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';

const baseUrl = 'https://api.spotify.com/v1';
const routes = {
    play: () => `/me/player/play`,
    playing: () => `/me/player/currently-playing`
};

@Injectable()
export class PlayerService extends HttpService<any>{
    
    constructor(http: HttpClient, 
                private fs: AngularFirestore) {
                    super(http, baseUrl);
                }

    startPlayer(uris: Array<string>, position_ms?: number, offset?: number){
        const body = {
            uris,
            offset,
            position_ms
        }
        return this.put(routes.play(), body);
    }


    getCurrentlyPlaying(){
        return this.getOne(routes.playing());
    }
}