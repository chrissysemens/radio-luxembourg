export class Session {
    userId: string
    playlistId: string
    channelId: string
    start: number

    constructor(userId: string, 
                channelId: string, 
                playlistId: string){
        this.userId = userId;
        this.playlistId = playlistId;
        this.channelId = channelId;
        this.start = new Date().getTime();
    }
}