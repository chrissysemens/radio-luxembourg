export class Track {
    id: string
    name: string
    artist: Array<string>
    imageUrl: string

    constructor(id: string, name: string, artist: Array<string>, imageUrl: string){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.imageUrl = imageUrl
    }
}