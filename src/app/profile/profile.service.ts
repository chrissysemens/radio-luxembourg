import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { Profile } from '../types/profile';
import { PathLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs';

const baseUrl = 'https://api.spotify.com';

const routes = {
    me: () => `/v1/me`,
  };

@Injectable()
export class ProfileService extends DataService<any>{
    
    profile: Profile;

    constructor(http: HttpClient) {
        super(http, baseUrl);
    }

    getMyProfile(): Observable<any>{
        return this.query(routes.me());
    }
}