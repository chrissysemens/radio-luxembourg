import { Track } from './track';

export class Request {
    uri: string
    request_time: Date
    duration_ms: number
    track_start: number
    title: string
    artists: Array<string>

    constructor(track: Track, track_start: number){
        this.uri = track.uri;
        this.title = track.name;
        this.artists = track.artist
        this.duration_ms = track.duration_ms;
        this.request_time = new Date();
        this.track_start = track_start;
    }
}