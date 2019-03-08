import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { CreatePlaylistRequest } from '../requests/playlist-create';
import { Profile } from '../types/profile';

const baseUrl = `https://api.spotify.com/v1/users/`;
const routes = {
    create: (userId: string) => `${userId}/playlists`,
};

@Injectable()
export class UserPlaylistService extends DataService<Profile>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    createRadioPlaylist(userId: string, request: CreatePlaylistRequest){
        return this.post(routes.create(userId), request);
    }
}