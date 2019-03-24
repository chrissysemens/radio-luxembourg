import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Session } from '../types/sesssion';

@Injectable()
export class SessionService{
    
    constructor(private fs: AngularFirestore) { }

    session: Session;

    createSession(userId: string, channelId: string, playlistId: string, playlistUri: string){
        localStorage.setItem('session_user_id', userId);
        localStorage.setItem('session_channel_id', channelId);
        localStorage.setItem('session_playlist_id', playlistId);
        localStorage.setItem('session_playlist_uri', playlistUri);
    }

    getSession(): Session {
        const userId = localStorage.getItem('session_user_id');
        const channelId = localStorage.getItem('session_channel_id');
        const playlistId = localStorage.getItem('session_playlist_id');
        const playlistUri = localStorage.getItem('session_playlist_uri');

        const session = new Session(userId, channelId, playlistId, playlistUri);
        return session
    }

    isSessionValid(session: Session){
        return session.userId && session.channelId && session.playlistId;
    }
}