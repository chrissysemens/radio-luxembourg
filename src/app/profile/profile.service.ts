import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { Profile } from '../types/profile';

const baseUrl = 'https://api.spotify.com';

const routes = {
    me: () => `/v1/me`,
  };

@Injectable()
export class ProfileService extends DataService<Profile>{
    
    profile: Profile;

    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    getMyProfile(){
        return this.getOne(routes.me());
    }
}