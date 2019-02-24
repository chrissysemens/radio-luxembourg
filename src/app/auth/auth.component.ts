import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent {

    constructor(private authService: AuthService,
                private router: Router){}

    ngOnInit(){

        const authenticated = this.authService.authorize();

        if(authenticated){
            this.router.navigate(['/welcome']);
        } else{
            console.log('sorry you are not authenticated');
        }
    }
}
