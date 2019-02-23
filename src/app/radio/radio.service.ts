import { Injectable, ɵConsole } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Request } from '../types/request';
import { Track } from '../types/track';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { puts } from 'util';

const baseUrl = 'https://api.spotify.com/v1';
const routes = {
    play: () => `/me/player/play`,
};

@Injectable({
    providedIn: 'root'
})

export class RadioService extends DataService<any>{
    
    constructor(http: HttpClient, 
                private fs: AngularFirestore) {
                    super(http, baseUrl, routes.play());
                }

    requestSong(track: Track){

        const request = new Request(track);

        const obj = JSON.parse(JSON.stringify(request));
        return this.fs.collection('tracks').add(obj);
    }

    getCurrentSong(){
        this.fs.collection('tracks').valueChanges()
            .subscribe((data: any) => {

                console.log(data);
                
                const body = {
                    "uris": [data[0].uri]
                }

                this.put(body);
            })
    }
}