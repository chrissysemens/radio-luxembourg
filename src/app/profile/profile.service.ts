import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../core/http.service';
import { Profile } from '../types/profile';

const baseUrl = 'https://api.spotify.com';

const routes = {
    me: () => `/v1/me`,
    currentlyplaying:  () => '/v1/me/player/currently-playing'
  };

@Injectable()
export class ProfileService extends HttpService<Profile>{
    
    profile: Profile;

    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    getMyProfile(){
        return this.getOne(routes.me());
    }

    getCurrentlyPlaying(){
        return this.getOne(routes.currentlyplaying());
    }
}