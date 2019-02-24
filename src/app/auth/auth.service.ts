import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthConfig } from '../../environments/api.config';
import { TokenNames } from '../enums/token-names';

const baseUrl = 'https://accounts.spotify.com/api';
const routes = {
    token: () => `/token`,
};

@Injectable({
    providedIn: 'root'
})

export class AuthService extends DataService<any>{
    
    constructor(
        @Inject(DOCUMENT) private document: any,
        private activatedRoute: ActivatedRoute,
        http: HttpClient){
            super(http, baseUrl, routes.token());
        }

    tokenName = TokenNames.auth;
    refreshTokenName = TokenNames.refresh;
    authUrl = AuthConfig.authUrl;
    refreshUrl = AuthConfig.refreshUrl;
    stop: Boolean
    accessToken: string;
    refreshToken: string;

    authorize(){
        const token = localStorage.getItem(this.tokenName);

        if (!token){
            this.activatedRoute.queryParams.subscribe(params => {
                this.accessToken = params['access_token'];
                this.refreshToken = params['refresh_token'];
                if(this.accessToken){
                    localStorage.setItem(this.tokenName, this.accessToken);
                    localStorage.setItem(this.refreshTokenName, this.refreshToken);

                    return true;
                }
                else{
                    this.document.location.href = this.authUrl;
                }
            })
        }

        return true;
    }

    refresh(){
        const refreshToken = localStorage.getItem(this.refreshTokenName);

        let params = new HttpParams();
        params = params.append('refresh_token', refreshToken);

        var result = this.http.get(this.refreshUrl, { params: params });

        result.subscribe((resp: any) => {
            console.log(resp.access_token);
            localStorage.setItem(this.tokenName, resp.access_token);
        });
    }

}