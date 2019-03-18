import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../core/firebase.service';
import { Track } from '../types/track';
import { Profile } from '../types/profile';
import { Request } from '../types/request';
import { map, take, takeLast } from 'rxjs/operators';

const routes = {
    queue: (channelId: string) => `/channels/${channelId}/tracks`,
    remove: (channelId: string, trackId: string) => `/channels/${channelId}/tracks/${trackId}`,
    request: (channelId: string) => `channels/${channelId}/tracks`,
};

@Injectable()
export class QueueService extends FirebaseService<any>{
    
   constructor(protected fs: AngularFirestore) {
       super(fs);
   }

   connect(channelId: string){
        return this.list(routes.queue(channelId));
    }

    deleteTrack(channelId: string, trackId: string){
        return this.delete(routes.remove(channelId, trackId));
    }

    getTracks(channelId: string){
        return this.list(routes.queue(channelId));
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