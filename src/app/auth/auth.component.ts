import { Component, OnInit, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthConfig } from '../../environments/api.config';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

    constructor(
        @Inject(DOCUMENT) private document: any,
        private router: Router,
        private activatedRoute: ActivatedRoute){}

    tokenName = 'spotify_token';
    authUrl = AuthConfig.authUrl;
    params: Object;
    stop: Boolean
    accessToken: string;

    ngOnInit(){
        const token = localStorage.getItem(this.tokenName);

        if (!token){
            this.activatedRoute.queryParams.subscribe(params => {
                this.accessToken = params['access_token'];
                if(this.accessToken){
                    localStorage.setItem(this.tokenName, this.accessToken);
                }
                else{
                    this.document.location.href = this.authUrl;
                }
            });
        } else {
            this.router.navigate(['/welcome']);
        }
    }
}
