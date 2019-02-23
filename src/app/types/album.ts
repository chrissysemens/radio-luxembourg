import { Track } from '../types/track';

export class Album {
    id: string
    name: string
    artist: Array<string>
    imageUrl: string
    tracks: Array<Track>

    constructor(id: string, 
                name: string, 
                artist: Array<string>, 
                imageUrl: string, 
                tracks: Array<Track>){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.imageUrl = imageUrl
        this.tracks = tracks;
    }
}