import { Component } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
  providers: [TokenService]
})
export class TokenComponent {

    constructor(private tokenService: TokenService,
                private router: Router){}

    ngOnInit(){
        const token = this.tokenService.authorize();
        this.router.navigate(['/welcome']);
    }
}
