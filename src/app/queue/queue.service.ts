import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../core/firebase.service';

const routes = {
    queue: (channelId: string) => `/channels/${channelId}/tracks`,
};

@Injectable()
export class QueueService extends FirebaseService<any>{
    
   constructor(protected fs: AngularFirestore) {
       super(fs);
   }

   connect(channelId: string){
        return this.list(routes.queue(channelId));
    }
}