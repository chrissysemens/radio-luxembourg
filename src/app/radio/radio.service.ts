import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Request } from '../types/request';
import { Track } from '../types/track';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';

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

        const request = new Request(track, trackStart);

        const obj = JSON.parse(JSON.stringify(request));
        return this.fs.collection('tracks').add(obj);
    }

    connect(){
        this.startRadio();
        this.stayTuned();
    }

    startRadio(){
        const conn = this.fs.collection('tracks')
            .valueChanges()
            .subscribe((tracks: any) => {
                const now = Date.now();

                /* Play the First Track */
                if(tracks.length){
                    console.log(tracks[0]);
                    const body = {
                        "uris": [tracks[0].uri],
                        "position_ms": now - tracks[0].track_start
                    }

                    this.put(body).subscribe(resp => console.log(resp));
                } else {
                    // TODO: What if there's no songs?  
                }
            });

        conn.unsubscribe;
    }

    stayTuned(){    
        this.fs.collection('tracks')
            .stateChanges(['added'])
            .subscribe(tracks => {

                /* Add all listed tracks to the Queue */
                tracks.forEach(track => {
                })
            });
    }
}