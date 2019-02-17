import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';

const baseUrl = 'https://api.spotify.com/v1';
const routes = {
    search: () => `/search`,
};

@Injectable()
export class SearchService extends DataService<any> {
    constructor(http: HttpClient) {
        super(http, baseUrl, routes.search());
    }
}