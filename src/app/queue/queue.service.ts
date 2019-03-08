import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

const routes = {
    queue: (channelId: string) => `/channels/${channelId}/tracks`,
};

@Injectable()
export class QueueService{
    
    constructor(private fs: AngularFirestore) {}

   connect(channelId: string){
        return this.fs.collection(routes.queue(channelId));
    }
}