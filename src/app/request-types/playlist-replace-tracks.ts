export class ReplacePlaylistTracksRequest {
    uris: Array<string>

    constructor(uris: Array<string>){
        this.uris = uris;
    }
}