import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Session } from '../types/sesssion';

@Injectable()
export class SessionService{
    
    constructor(private fs: AngularFirestore) { }

    createSession(userId: string, session: Session){
        const obj = JSON.parse(JSON.stringify(session));
        return this.fs.collection('sessions').add(obj);
    }
}