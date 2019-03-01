import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';

const baseUrl = 'https://api.spotify.com';

@Injectable()
export class ProfileService extends DataService<any>{
    
    constructor(http: HttpClient) {
        super(http, baseUrl);
    }
}