import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { Playlist } from '../types/playlist';

const baseUrl = 'https://api.spotify.com/v1/playlists';

const routes = {
    create: () => `/me/player/play`,
};

@Injectable()
export class PlaylistService extends DataService<Playlist>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }
}