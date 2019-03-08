import { Track } from './track';
import { Profile } from './profile';

export class Request {
    request_time: Date
    track_start: number
    track: Track
    requestor: string

    constructor(track: Track, track_start: number, profile: Profile){
        this.track = track;
        this.request_time = new Date();
        this.track_start = track_start;
        this.requestor = profile.display_name;
    }
}