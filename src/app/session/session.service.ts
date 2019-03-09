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
    }

    getSession(): Session {
        console.log(this.session);
        return this.session;
    }
}