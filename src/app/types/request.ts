import { Track } from './track';

export class Request {
    uri: string
    request_time: Date
    duration_ms: number
    track_start: number

    constructor(track: Track, track_start: number){
        this.uri = track.uri;
        this.duration_ms = track.duration_ms;
        this.request_time = new Date();
        this.track_start = track_start;
    }
}