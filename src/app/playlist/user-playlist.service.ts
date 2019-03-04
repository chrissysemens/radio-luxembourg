import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { CreatePlaylistRequest } from '../types/create-playlist-request';

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

    createRadioPlaylist(
        name: string, 
        isPublic: boolean, 
        isCollaborative: boolean, 
        description: string){
        const req = new CreatePlaylistRequest(
            name,
            isPublic, 
            isCollaborative,
            description);

        this.post(routes.create(), req).subscribe(resp => console.log(resp));
    }
}