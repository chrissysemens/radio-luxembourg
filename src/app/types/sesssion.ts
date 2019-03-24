export class Session {
    userId: string
    playlistId: string
    playlistUri: string
    channelId: string
    start: number
    connected: boolean

    constructor(userId: string, 
                channelId: string, 
                playlistId: string,
                playlistUri: string){
        this.userId = userId;
        this.playlistId = playlistId;
        this.playlistUri = playlistUri;
        this.channelId = channelId;
        this.start = Date.now();
        this.connected = false;
    }
}