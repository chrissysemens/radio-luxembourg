import { Track } from '../types/track';

export class Playlist {
    id: string
    name: string
    owner: string
    tracks: Array<Track>

    constructor(id: string, name: string, owner: string, tracks: Array<Track>){
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.tracks = tracks;
    }
}