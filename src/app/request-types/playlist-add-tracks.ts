export class AddTracksToPlaylistRequest {
    uris: Array<string>
    position?: number

    constructor(uris: Array<string>, position?: number){
        this.uris = uris;
        position ? this.position = position : null;
    }
}