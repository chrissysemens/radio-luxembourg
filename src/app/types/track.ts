export class Track {
    id: string
    name: string
    artist: Array<string>
    imageUrl: string
    uri: string
    duration_ms: number

    constructor(id: string, 
                name: string,
                artist: Array<string>, 
                imageUrl: string, 
                uri: string,
                duration_ms: number){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.imageUrl = imageUrl;
        this.uri = uri;
        this.duration_ms = duration_ms;
    }
}