export class DeleteTracksFromPlaylistRequest {
    uris: Array<string>

    constructor(uris: Array<string>){
        this.uris = uris;
    }
}