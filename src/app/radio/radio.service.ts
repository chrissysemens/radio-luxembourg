import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';

const baseUrl = 'https://api.spotify.com/v1';
const routes = {
    play: () => `/me/player/play`,
};

@Injectable()
export class RadioService extends HttpService<any>{
    
    constructor(http: HttpClient, 
                private fs: AngularFirestore) {
                    super(http, baseUrl);
                }

    startRadio(context_uri: string, position_ms?: number, offset?: number){
        const body = {
            context_uri,
            offset,
            position_ms
        }
        return this.put(routes.play(), body);
    }

}