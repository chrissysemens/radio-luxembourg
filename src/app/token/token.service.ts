import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TokenConfig } from '../../environments/api.config';
import { TokenNames } from '../enums/token-names';

const baseUrl = 'https://accounts.spotify.com/api';
const routes = {
    token: () => `/token`,
};

@Injectable({
    providedIn: 'root'
})

export class TokenService extends DataService<any>{
    
    constructor(
        @Inject(DOCUMENT) private document: any,
        private activatedRoute: ActivatedRoute,
        http: HttpClient){
            super(http, baseUrl);
        }

    tokenName = TokenNames.auth;
    refreshTokenName = TokenNames.refresh;
    tokenUrl = TokenConfig.tokenUrl;
    refreshUrl = TokenConfig.refreshUrl;
    stop: Boolean
    accessToken: string;
    refreshToken: string;
    expiry_time: number;

    authorize(){
        const token = localStorage.getItem(this.tokenName);

        if (!token){
            this.activatedRoute.queryParams.subscribe(params => {
                this.accessToken = params['access_token'];
                this.refreshToken = params['refresh_token'];
                this.expiry_time = new Date().getTime() + parseInt(params['expires_in']);

                if(this.accessToken){
                    localStorage.setItem(this.tokenName, this.accessToken);
                    localStorage.setItem(this.refreshTokenName, this.refreshToken);
                    localStorage.setItem('expiry_time', this.expiry_time.toString());

                    return this.accessToken;
                }
                else{
                    this.document.location.href = this.tokenUrl;
                }
            })
        } 

        return token;
    }

    refresh(){
        const refreshToken = localStorage.getItem(this.refreshTokenName);
        let token = localStorage.getItem(this.tokenName);

        let params = new HttpParams();
        params = params.append('refresh_token', refreshToken);

        var result = this.http.get(this.refreshUrl, { params: params });

        result.subscribe((resp: any) => {
            token = resp.accessToken;
            localStorage.setItem(this.tokenName, resp.access_token);

            this.expiry_time = new Date().getTime() + parseInt(resp.expires_in);
            localStorage.setItem('expiry_time', this.expiry_time.toString());
        });

        return token;
    }
}