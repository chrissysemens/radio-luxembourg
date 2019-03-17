import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../core/firebase.service';

const routes = {
    queue: (channelId: string) => `/channels/${channelId}/tracks`,
    remove: (channelId: string, trackId: string) => `/channels/${channelId}/tracks/${trackId}`
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
}