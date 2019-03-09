import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';
import { CreatePlaylistRequest } from '../request-types/playlist-create';
import { Profile } from '../types/profile';
import { Playlist } from '../types/playlist';

const baseUrl = `https://api.spotify.com/v1/users/`;
const routes = {
    create: (userId: string) => `${userId}/playlists`,
};

@Injectable()
export class UserPlaylistService extends HttpService<Profile>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    createRadioPlaylist(userId: string, request: CreatePlaylistRequest){
       return this.post(routes.create(userId), request);
    }
}