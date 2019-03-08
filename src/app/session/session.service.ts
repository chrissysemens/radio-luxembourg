import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Session } from '../types/sesssion';

@Injectable()
export class SessionService{
    
    constructor(private fs: AngularFirestore) { }

    session: Session;

    createSession(session: Session){
        this.session = session;
        console.log(this.session);

        /* There's no need to persist to fs
        const obj = JSON.parse(JSON.stringify(session));
        return this.fs.collection('sessions').add(obj); */
    }

    getSession(): Session {
        console.log(this.session);
        return this.session;
    }
}