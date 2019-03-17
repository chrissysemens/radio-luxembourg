import { Profile } from '../types/profile';

export class Session {
    user: Profile
    playlistId: string
    channelId: string
    start: number
    connected: boolean

    constructor(user: Profile, 
                channelId: string, 
                playlistId: string){
        this.user = user;
        this.playlistId = playlistId;
        this.channelId = channelId;
        this.start = Date.now();
        this.connected = false;
    }
}