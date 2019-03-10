import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';
import { Playlist } from '../types/playlist';

const baseUrl = `https://api.spotify.com/v1/me /`;
const routes = {
    get: () => `playlists`,
};

@Injectable()
export class MyPlaylistService extends HttpService<Playlist>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }
}