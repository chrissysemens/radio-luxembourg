import { Track } from './track';

export class Request {
    uri: string
    requestDate: Date
    duration_ms: number;

    constructor(track: Track){
        this.uri = track.uri;
        this.duration_ms = track.duration_ms;
        this.requestDate = new Date();
    }
}