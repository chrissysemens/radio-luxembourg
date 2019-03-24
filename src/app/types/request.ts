import { Track } from './track';

export class Request {
    request_time: Date
    track_start: number
    track: Track
    requestor: string

    constructor(track: Track, track_start: number, userId: string){
        this.track = track;
        this.request_time = new Date();
        this.track_start = track_start;
        this.requestor = userId;
    }
}