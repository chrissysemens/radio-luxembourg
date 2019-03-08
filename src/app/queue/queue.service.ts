import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

const routes = {
    queue: (sessionId: string) => `/sessions/${sessionId}/tracks`,
};

@Injectable()
export class QueueService{
    
    constructor(private fs: AngularFirestore) {}

   connect(sessionId: string){
        return this.fs.collection(routes.queue(sessionId));
    }
}