import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { CreatePlaylistRequest } from '../requests/playlist-create';

const userId = localStorage.getItem('user_id');
const baseUrl = `https://api.spotify.com/v1/users/${userId}`;
const routes = {
    create: () => `/playlists`,
};

@Injectable()
export class UserPlaylistService extends DataService<any>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    createRadioPlaylist(request: CreatePlaylistRequest){
        return this.post(routes.create(), request);
    }
}